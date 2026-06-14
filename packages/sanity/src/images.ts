import type {
  SanityImageObjectStub,
  SanityImageSource,
} from "@sanity/asset-utils";
import type { ImageUrlBuilder } from "@sanity/image-url";
import type { SanityProjectImage } from "./types";

function isImageObject(
  image: SanityImageSource
): image is SanityImageObjectStub {
  return typeof image === "object" && image !== null && "asset" in image;
}

function getAssetRef(
  asset: SanityImageObjectStub["asset"]
): string | undefined {
  if (asset && typeof asset === "object" && "_ref" in asset) {
    return asset._ref;
  }

  return undefined;
}

function hasAsset(image: SanityImageSource): boolean {
  return isImageObject(image) && getAssetRef(image.asset) !== undefined;
}

/**
 * See: https://github.com/sanity-io/asset-utils/issues/1
 */
function getImageDimensionsWithCrop(
  image: SanityImageSource
): { width: number; height: number; aspectRatio: number } | undefined {
  if (!isImageObject(image)) {
    return;
  }

  const assetRef = getAssetRef(image.asset);
  if (!assetRef) {
    return;
  }

  // example asset._ref:
  // image-7558c4a4d73dac0398c18b7fa2c69825882e6210-366x96-png
  // When splitting by '-' we can extract the dimensions, id and extension
  const dimensions = assetRef.split("-")[2];
  const [width, height] = dimensions.split("x").map(Number);

  if (!(width > 0 && height > 0)) {
    return;
  }

  if (image.crop) {
    const croppedWidth =
      width * (1 - (image.crop?.right || 0) - (image.crop?.left || 0));
    const croppedHeight =
      height * (1 - (image.crop?.top || 0) - (image.crop?.bottom || 0));
    return {
      width: croppedWidth,
      height: croppedHeight,
      aspectRatio: croppedWidth / croppedHeight,
    };
  }

  return {
    width,
    height,
    aspectRatio: width / height,
  };
}

export function buildImages(
  builder: ImageUrlBuilder,
  images: unknown[]
): SanityProjectImage[] {
  return (images as SanityImageSource[])
    .filter(hasAsset)
    .map((image) => buildImage(builder, image));
}

function buildImage(
  builder: ImageUrlBuilder,
  image: SanityImageSource
): SanityProjectImage {
  const dimensions = getImageDimensionsWithCrop(image);

  return {
    thumbnail: builder.image(image).width(800).format("webp").quality(80).url(),
    url: builder.image(image).width(1600).format("webp").quality(85).url(),
    aspectRatio: dimensions?.aspectRatio ?? 1,
  };
}
