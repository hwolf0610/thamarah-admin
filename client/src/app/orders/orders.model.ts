export interface OrderDetailModel {
	order: OrderModel;
	cart: CartModel;
	deliveryBoyRating: DeliveryBoyRatingModel;
}

export interface OrderModel {
	isOrderAssigned: boolean;
	assignedToName: string;
	isAcceptedByDeliveryBoy: boolean;
	isWalletUsed: boolean;
	_id: string;
	subTotal: number;
	paymentStatus: string;
	tax: number;
	totalProduct: number;
	grandTotal: number;
	deliveryCharges: number;
	couponCode: string;
	couponAmount: number;
	address: AddressModel;
	user: UserModel;
	userId: string;
	paymentType: string;
	orderStatus: string;
	cartId: string;
	orderID: number;
	deliveryDate: string;
	deliveryTime: string;
	usedWalletAmount: number;
	amountRefunded: number;
	orderFrom: string;
	createdAt: string;
	updatedAt: string;
	products: Array<any>;
	transactionDetails: any;
	cart: CartModel;
	invoiceToken: string;
	currencyCode: string;
	currencySymbol: string;
}

export interface CartModel {
	products: Array<CartProductModel>
	productIds: Array<string>;
	couponAmount: number;
	walletAmount: number;
	isOrderLinked: boolean;
	subTotal: number;
	tax: number;
	grandTotal: number;
	deliveryCharges: number;
	taxInfo: TaxModel;
	couponCode: string;
	deliveryAddress: string;
}

export interface CartProductModel {
	productId: string;
	productName: string;
	unit: string;
	price: number;
	quantity: number;
	productTotal: number;
	imageUrl: number;
	filePath: number;
	dealAmount: number;
	dealTotalAmount: number;
	isDealAvailable: boolean;
}

export interface TaxModel {
	taxName: string;
	amount: number;
}

export interface AddressModel {
	address: string;
	flatNo: string;
	postalCode: string;
	addressType: string;
	apartmentName: string;
	landmark: string;
	location: {
		latitude: number;
		longitude: number;
	};
}

export interface UserModel {
	firstName: string;
	lastName: string;
	mobileNumber: string;
	email: string;
	countryCode: string;
}

export interface DeliveryBoyRatingModel {
	rate: number;
	description: string;
	orderId: string;
	deliveryBoyId: string;
	userId: string;
}