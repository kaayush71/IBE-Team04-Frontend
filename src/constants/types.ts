import { RoomType } from "../redux/reducers/roomResultConfigDataSlice";

export interface rooms {
  roomCountArray: [number];
  roomCountSelected: number;
}
export interface guestType {
  categoryName: string;
  ageRange: string;
  count: number;
  minCount: number;
}
export interface guest {
  guestTypes: guestType[];
}
export interface bed {
  bedCountSelected: number;
  bedCountArray: number[];
}

export interface roomCard {
  title: string;
  address: string;
  roomImageArray: string[];
  breakfastOptions: string;
  area: string;
  personCapacity: number;
  ratings: {
    showRatings: boolean;
    averageRatings: number;
    totalReviews: number;
  };
  bedType: string;
  promotion: {
    showPromotion: boolean;
    promotionDescription: string;
    discountPercentage: number;
  };
  roomPrice: number;
}

export interface limit {
  lowerLimit: number;
  upperLimit: number;
}

export interface roomResultsConfigData {
  filters: {
    bedTypeFilter: {
      showBedFilter: boolean;
      bedFilterArrayOptions: string[];
    };
    roomTypeFilter: {
      showRoomTypeFilter: boolean;
      roomTypeFilterArrayOptions: string[];
    };
    numberOfBedsFilter: {
      showNumberOfBedFilter: boolean;
      numberOfBedsFilterOptions: string[];
    };
    priceFilter: {
      showPriceFilter: boolean;
      priceFilterOptions: limit[];
    };
  };
  sorts: {
    rating: {
      showRatingSort: boolean;
      ratingSortOptions: string[];
    };
    area: {
      showAreaSort: boolean;
      areaSortOption: string[];
    };
  };
}

export type Filters = {
  [key: string]: string[];
};

export type RequestBody = {
  sortType: string;
  numberOfRooms: number;
  numberOfBeds: number;
  pageSize: number;
  pageNumber: number;
  filters: Filters;
  startTime: string;
  endTime: string;
};

export type Promotion = {
  minimumDaysOfStay: number;
  priceFactor: number;
  promotionDescription: string;
  promotionTitle: string;
  isDeactivated: boolean;
  promotionId: number;
};

export type promotionSliceIntialState = {
  promotions: Promotion[];
  loading: boolean;
  specialPromotion: Promotion;
  showSpecialPromotion: boolean;
  isSpecialPromotionError: boolean;
  selectedPromotionRoomType: string;
  fetchCustomPromoStatus: string;
};

export const initialRoom: RoomType = {
  areaInSquareFeet: 0,
  doubleBed: 0,
  maxCapacity: 0,
  roomTypeName: "",
  roomTypeId: 0,
  propertyAddress: "",
  singleBed: 0,
  roomRate: 0,
  bedType: "",
  priceType: "",
  bestPromotion: {
    minimumDaysOfStay: 0,
    priceFactor: 0,
    promotionDescription: "",
    promotionTitle: "",
    isDeactivated: false,
    promotionId: 0,
  },
  ratingAndReviews: {
    showRatingsAndReviews: true,
    averageRatingValue: 0,
    numberOfRatings: 0,
  },
};

export interface RoomTypeRate {
  date: string;
  roomTypeRate: number;
}

export interface Booking {
  bookingId: number;
  checkInDate: string;
  checkOutDate: string;
  roomTypeId: number;
  roomTypeName: string;
  nightlyRate: number;
  subTotal: number;
  propertyId: number;
  customPromotion: Promotion | null;
  graphQlPromotion: {
    minimumDaysOfStay: number;
    priceFactor: number;
    promotionDescription: string;
    promotionTitle: string;
    isDeactivated: boolean;
    promotionId: number;
  } | null;
  roomsCount: number;
  totalCostOfStay: number;
  travellerEmail: string;
  travellerFirstName: string;
  travellerLastName: string | null;
  travellerPhoneNumber: string;
  billingFirstName: string;
  billingLastName: string;
  billingPhoneNumber: string;
  billingEmail: string;
  billingMailingAddress1: string;
  billingMailingAddress2: string;
  billingCity: string;
  billingState: string;
  billingCountry: string;
  billingZip: string;
  cardNumber: string;
  cardNumberExpiryMonth: string;
  cardNumberExpiryYear: string;
  bedsCount: number;
  adultCount: number;
  childCount: number;
  teenCount: number;
  isSendOffers: boolean;
  isCancelled: boolean;
  tax: number;
  vat: number;
}

export interface Ratings {
  ratingId: string;
  roomTypeId: number;
  ratingValue: number;
  email: string;
  reviewDescription: string;
  roomTypeName: string;
  travellerName: string;
}
