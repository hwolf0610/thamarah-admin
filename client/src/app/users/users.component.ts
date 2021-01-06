import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { UserService } from './user.service';
import { UtilService } from "../../service/util.service";
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
	public isLoading = false;
	public users: Array<any> = [];
	public page: number = 0;
	public limit: number = 25;
	public total: number = 0;
	public search: string = '';
	@ViewChild('searchUser', { static: true }) searchUser: ElementRef;

	constructor(
		private utilService: UtilService,
		private userService: UserService
	) {
		this.getAllUser();
	}

	ngOnInit() {
		fromEvent(this.searchUser.nativeElement, 'keyup').pipe(
			map((event: any) => { return event.target.value; }),
			debounceTime(500),
	  		distinctUntilChanged()
		).subscribe((search: string) => {
			this.page = 1;
			if (search.length > 2) {
				this.search = search;
				this.getAllUser();
			} else if (search.length == 0) {
				this.search = '';
				this.getAllUser();
			}
			return;
		});
	}

	// Update status
	public updateStatus(event, id): void {
		const body = { status: event };
		this.isLoading = true;
		this.userService.updateStatus(id, body).subscribe((res: any) => {
			this.isLoading = false;
			this.utilService.successMessage(res.response_data);
		}, error => this.isLoading = false);
	}

	// Pagination
	public pageChange(page: number): void {
		this.page = page;
		this.getAllUser();
	}

	// Get all user
	private getAllUser(): void {
		this.isLoading = true;
		this.userService.getAll(this.page, this.limit, this.search).subscribe((res: any) => {
			this.isLoading = false;
			this.users = res.response_data;
			this.total = res.total;
		}, error => this.isLoading = false);
	}
}
