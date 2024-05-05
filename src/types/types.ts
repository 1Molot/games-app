export type Platform = {
  id: number;
  name: string;
};

export type Genre = {
  id: number;
  name: string;
};

export type ShortScreenshot = {
  id: number;
  image: string;
};

export type Tag = {
  id: number;
  slug: string;
  language: string;
  games_count: number;
};

export type GameLister = {
  id: number;
  name: string;
  rating: number;
  background_image: string;
  parent_platforms: {
    platform: Platform;
  }[];
  genres: Genre[];
  short_screenshots: ShortScreenshot[];
  tags: Tag[];
};
