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
