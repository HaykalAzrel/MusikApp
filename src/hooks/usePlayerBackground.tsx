import { useState, useEffect } from "react";
import ImageColors from "react-native-image-colors";

export const usePlayerBackground = (imageUrl?: string | null) => {
  const [colors, setColors] = useState<{
    primary: string;
    secondary: string;
    fallback: boolean; 
  }>({
    primary: "#000000",
    secondary: "#a96524ff",
    fallback: false,
  });

  useEffect(() => {
    if (!imageUrl) return;

    const fetchColors = async () => {
      try {
        const result = await ImageColors.getColors(imageUrl, {
          fallback: "#000000",
          cache: true,
          key: imageUrl,
        });

        if (result.platform === "android") {
          setColors({
            primary: result.dominant || "#000000",
            secondary: result.average || "#a96524ff",
            fallback: false,
          });
        } else if (result.platform === "ios") {
          setColors({
            primary: result.primary || "#000000",
            secondary: result.secondary || "#a96524ff",
            fallback: false,
          });
        }
      } catch (error) {
        console.warn("ImageColors failed, fallback to blur:", error);
        setColors((prev) => ({ ...prev, fallback: true }));
      }
    };

    fetchColors();
  }, [imageUrl]);

  return colors;
};
