<template>
<section class="lol-what-we-stand-for paddingTopLarge paddingBottomLarge">
    <div class="lol-what-we-stand-for-content">
        <h2 class="marginBottomMedium tw-text-6xl">What we stand for</h2>
        <div class="lol-what-we-stand-for-content-element tw-my-16">
            <div class="lol-what-we-stand-for-content-element-left">
                <h3 class="tw-text-4xl">Omhels de natuur</h3>
                <p class="tw-text-sm">Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.</p>
            </div>
            <div class="lol-what-we-stand-for-content-element-right">
                <img :src="require(`~/assets/images/Tree.png`)" />
            </div>
        </div>
        <div class="lol-what-we-stand-for-content-element tw-my-16">
            <div class="lol-what-we-stand-for-content-element-left">
                <img :src="require(`~/assets/images/Townhall.png`)" />
            </div>
            <div class="lol-what-we-stand-for-content-element-right">
                <h3 class="tw-text-4xl">Ontdek de verborgen stad</h3>
                <p class="tw-text-sm">Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.</p>
            </div>
        </div>
        <div class="lol-what-we-stand-for-content-element tw-my-16">
            <div class="lol-what-we-stand-for-content-element-left">
                <h3 class="tw-text-4xl">Interactieve wandelingen</h3>
                <p class="tw-text-sm">Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.</p>
            </div>
            <div class="lol-what-we-stand-for-content-element-right">
                <img :src="require(`~/assets/images/WomanReaching.png`)" />
            </div>
        </div>
    </div>
</section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'WhatWeStandFor'
})
</script>

<style lang="scss">
@import "~/assets/styles/resolutions";
@import "~/assets/styles/variables";
@import "~/assets/styles/fonts";

.lol-what-we-stand-for {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgb(87, 87, 87);
    background: linear-gradient(315deg, rgba(87, 87, 87, 1) 0%, rgba(22, 22, 22, 1) 100%);

    .lol-what-we-stand-for-content {
        width: 60%;
        height: auto;
        min-height: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;

        h2 {
            color: $colorLightOrange;
            font-family: 'BebasNeue';
            background: linear-gradient(124deg, rgba(188, 109, 40, 1) 0%, rgba(211, 152, 86, 1) 100%, rgba(41, 54, 24, 1) 293618%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;

            &:after {
                background-color: $colorOrange;
            }
        }

        .lol-what-we-stand-for-content-element {
            display: flex;
            flex-direction: row;
            height: inherit;
            gap: 4rem;

            &:nth-child(2n+1) {
                .lol-what-we-stand-for-content-element-left {
                    width: 40%;
                    display: flex;
                    justify-content: center;

                    img {
                        max-width: 100%;
                        max-height: 400px;
                    }
                }

                .lol-what-we-stand-for-content-element-right {
                    width: 60%;
                    display: flex;
                    flex-direction: column;
                    flex: 1 0 auto;
                    justify-content: center;
                    align-items: flex-start;

                    h3 {
                        color: $colorLightOrange;
                        font-family: 'BebasNeue';
                        background: linear-gradient(124deg, rgba(188, 109, 40, 1) 0%, rgba(211, 152, 86, 1) 100%, rgba(41, 54, 24, 1) 293618%);
                        background-clip: text;
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                    }

                    p {
                        color: $secondaryTextColor;
                        line-height: 145%;
                        max-width: 65ch;
                        font-family: 'Montserrat-Light';
                        position: relative;
                        height: inherit;

                        &:before {
                            content: ' ';
                            position: absolute;
                            height: 100%;
                            left: -50px;
                            border: 0.5px solid $colorOrange;
                        }
                    }
                }
            }

            &:nth-child(2n) {
                .lol-what-we-stand-for-content-element-left {
                    width: 60%;
                    text-align: right;
                    display: flex;
                    flex-direction: column;
                    flex: 1 0 auto;
                    justify-content: center;
                    align-items: flex-end;

                    h3 {
                        color: $colorLightOrange;
                        font-family: 'BebasNeue';
                        background: linear-gradient(124deg, rgba(188, 109, 40, 1) 0%, rgba(211, 152, 86, 1) 100%, rgba(41, 54, 24, 1) 293618%);
                        background-clip: text;
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                    }

                    p {
                        color: $secondaryTextColor;
                        line-height: 145%;
                        max-width: 65ch;
                        font-family: 'Montserrat-Light';
                        position: relative;
                        height: inherit;

                        &:before {
                            content: ' ';
                            position: absolute;
                            height: 100%;
                            right: -50px;
                            border: 0.5px solid $colorOrange;
                        }
                    }
                }

                .lol-what-we-stand-for-content-element-right {
                    width: 40%;
                    display: flex;
                    justify-content: center;

                    img {
                        max-width: 100%;
                        max-height: 300px;
                    }
                }
            }
        }
    }
}
</style>
