export const useImageFallback = (imageElement: any, fallbackSrc: string) => {
    const replaceByDefault = () => {
        if (imageElement) {
            imageElement.src = fallbackSrc
        }
    }
    return replaceByDefault
};