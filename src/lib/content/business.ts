export const BUSINESS = {
  name: "Studio Tapicerskie BERO",
  address: {
    street: "Św. Wojciech 70",
    locality: "Międzyrzecz",
    postalCode: "66-300",
    country: "PL",
  },
  phone: "+48 720 770 960",
  email: "szumnyfilip@gmail.com",
  geo: {
    latitude: 52.448_008_1,
    longitude: 15.547_803_8,
  },
  social: {
    facebook: "https://www.facebook.com/StudioTapicerskieBERO",
    instagram: "https://www.instagram.com/studio.tapicerskie.bero",
  },
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1001.234567!2d15.5478038!3d52.4480081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4706f363ce2dc1cb%3A0xe47e1b90d924b267!2sBERO%20Us%C5%82ugi%20tapicerskie!5e0!3m2!1spl!2spl!4v1700000000000!5m2!1spl!2spl",
} as const;

/** Formatted full address string */
export const BUSINESS_UNSTRUCTURED_ADDRESS =
  `${BUSINESS.address.street}, ${BUSINESS.address.locality}, ${BUSINESS.address.country}, ${BUSINESS.address.postalCode}` as const;

/** Social profile URLs as array (for schema.org sameAs, etc.) */
export const BUSINESS_SOCIAL_URLS = [
  BUSINESS.social.facebook,
  BUSINESS.social.instagram,
] as const;
