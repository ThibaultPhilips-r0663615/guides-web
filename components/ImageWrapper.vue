<template>
<div v-if="imageLoaded" :style="{ background: getBackground() }" class="image-wrapper">
    <div class="image-wrapper-content">
        <img :src="itemUrl" :id="`${itemId}_image`" @load="getAverageRGB($event)" />
    </div>
</div>
</template>

<script>
import clamp from "clamp";
export default {
    name: "ImageWrapper",
    data: () => ({
        backgroundColor: {},
        imageLoaded: true,
    }),
    methods: {
        getBackground() {
            return (
                "linear-gradient(135deg, rgba(" +
                clamp(this.backgroundColor.r * 0.5, 0, 255) +
                "," +
                clamp(this.backgroundColor.g * 0.5, 0, 255) +
                "," +
                clamp(this.backgroundColor.b * 0.5, 0, 255) +
                ",1) 0%,rgba(" +
                clamp(this.backgroundColor.r * 1.5, 0, 255) +
                "," +
                clamp(this.backgroundColor.g * 1.5, 0, 255) +
                "," +
                clamp(this.backgroundColor.b * 1.5, 0, 255) +
                ",1) 100%)"
            );
        },
        getAverageRGB(e) {
            let image = document.getElementById(`${this.itemId}_image`);
            if (!!image) {
                image.crossOrigin = "Anonymous";
                var blockSize = 5, // only visit every 5 pixels
                    defaultRGB = {
                        r: 0,
                        g: 0,
                        b: 0
                    }, // for non-supporting envs
                    canvas = document.createElement("canvas"),
                    context = canvas.getContext("2d"),
                    data,
                    width,
                    height,
                    i = -4,
                    length,
                    rgb = {
                        r: 0,
                        g: 0,
                        b: 0
                    },
                    count = 0;

                if (!context) {
                    return defaultRGB;
                }

                height = canvas.height =
                    e.path[0].naturalHeight != 0 ? e.path[0].naturalHeight : image.height;
                width = canvas.width = e.path[0].naturalWidth != 0 ? e.path[0].naturalWidth : image.width;

                context.drawImage(image, 0, 0, width, height);

                try {
                    data = context.getImageData(0, 0, width, height);
                } catch (e) {
                    return defaultRGB;
                }

                length = data.data.length;

                let addExtremesFrequency = 0;
                while ((i += blockSize * 4) < length) {
                    ++count;
                    let color = data.data[i] + data.data[i + 1] + data.data[i + 2];
                    if (color >= 50 && color <= 764) {
                        rgb.r += data.data[i];
                        rgb.g += data.data[i + 1];
                        rgb.b += data.data[i + 2];
                    } else {
                        if (addExtremesFrequency == 0) {
                            rgb.r += data.data[i];
                            rgb.g += data.data[i + 1];
                            rgb.b += data.data[i + 2];
                            addExtremesFrequency = 2;
                        } else {
                            addExtremesFrequency--;
                        }
                    }
                }

                rgb.r = Math.ceil(rgb.r / count);
                rgb.g = Math.ceil(rgb.g / count);
                rgb.b = Math.ceil(rgb.b / count);

                let lum = 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b;

                this.backgroundColor = rgb;
                this.imageLoaded = true;
            }
        },
    },
    props: {
        itemUrl: {
            type: String,
            default: "",
        },
        itemId: {
            type: String,
            default: "",
        },
        alt: {
            type: String,
            default: "",
        },
        needsBackgroundColor: {
            type: Boolean,
            default: false,
        },
        imageCover: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
