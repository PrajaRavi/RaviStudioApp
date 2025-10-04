// DropletImage.native.jsx
import React from "react";
import { View } from "react-native";
import Svg, { Defs, ClipPath, Path, Image as SvgImage, Rect, Text } from "react-native-svg";

export function DropImage({
  src,
  size = 160,
  strokeWidth = 2,
  strokeColor = "rgba(0,0,0,0.12)",
}) {
  const clipId = React.useId();

  // ✅ Clean droplet path (no inner cutout)
  const dropletPath = `M8 0C8 0 2 6 2 10a6 6 0 0 0 12 0C14 6 8 0 8 0z`;
  const viewBox = "0 0 16 16";

  return (
    <View style={{ width: size, height: size }}>
      <Svg
        viewBox={viewBox}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
      >
        <Defs>
          <ClipPath id={clipId} clipPathUnits="userSpaceOnUse">
            <Path d={dropletPath} />
          </ClipPath>
        </Defs>

        {src ? (
          <SvgImage
            href={{ uri: src }}
            x="0"
            y="0"
            width="16"
            height="16"
            preserveAspectRatio="xMidYMid slice"
            clipPath={`url(#${clipId})`}
          />
        ) : (
          <React.Fragment>
            <Rect
              x="0"
              y="0"
              width="16"
              height="16"
              fill="#e6eef8"
              clipPath={`url(#${clipId})`}
            />
            <Text
              x="8"
              y="8"
              fontSize="2"
              textAnchor="middle"
              fill="#9bb4d9"
              clipPath={`url(#${clipId})`}
            >
              No image
            </Text>
          </React.Fragment>
        )}

        {/* Optional outline */}
        
      </Svg>
    </View>
  );
}
