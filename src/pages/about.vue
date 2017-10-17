<template>
    <f7-page class="about-page">
        <f7-navbar :title="$t('app.about')" :back-link="$t('app.back')" sliding></f7-navbar>
        <f7-block>
            <div class="logo">
                <img src="../../static/img/beedle_logo@2x.png" alt="logo">
            </div>
            <div class="app-name">Beedle</div>
        </f7-block>
        <f7-block>
            <div class="row">
                <div class="col-lg-1 col-centered detail">
                    <p>
                        <f7-icon f7="email_fill"></f7-icon>
                        info@beedleapp.com
                    </p>
                    <p>
                        <f7-icon f7="social_twitter_fill"></f7-icon>
                        @beedle
                    </p>
                </div>
            </div>
        </f7-block>

        <f7-block class="copyright">
            Copyright © 2017. Developed by Caspian Soft.
        </f7-block>
    </f7-page>
</template>

<style lang="less">
    .about-page {
        .logo {
            width: 90px;
            height: 90px;
            line-height: 90px;
            background-color: #fff;
            text-indent: -9999;
            border-radius: 5px;
            margin: 0 auto;
            border: 1px solid #dfdfdf;
            text-align: center;
            > img {
                width: 75px;
                height: 75px;
                vertical-align: middle;
            }
        }
        .app-name {
            text-align: center;
            color: #666;
            font-size: 20px;
            margin-top: 15px;
        }
        .detail {
            color: #666;
        }
        .copyright {
            position: absolute;
            left: 0;
            text-align: center;
            bottom: 0;
            font-size: 10px;
            color: #9c9c9c;
            width: 100%;
            padding: 0;
        }
        .col-centered {
            float: none;
            margin: 0 auto;
        }
    }
</style>