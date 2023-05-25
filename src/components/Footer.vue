<template>
    <footer class="ms_footer">
        <div class="container ms_container">
            <div class="row gx-5">
                <div class="col-xl-4 col-md-6 col-sm-12">
                    <img class="ms_logo ms_img" src="logo-boolbnb.png" alt="">
                    <p class="ms_p">BoolBnB is a hospitality company based in London that specialises in sourcing medium term accommodation for corporate professionals in relocation and short term accommodation for holiday makers in different locations in Europe.</p>
                </div>
                <div class="col-xl-4 col-md-3 col-sm-6 col-xs-12 navigation">
                    <h4 class="ms_h4">Navigazione</h4>
                    <ul class="ms_ul">
                        <li class="ms_li">
                            <a class="ms_a" href="#">Home</a>
                        </li>
                        <li class="ms_li">
                            <a class="ms_a" href="#">Ricerca avanzata</a>
                        </li>
                        <li class="ms_li">
                            <a class="ms_a" href="#">Iscriviti</a>
                        </li>
                    </ul>
                </div>
                <div class="col-xl-4 col-md-3 col-sm-6 contacts">
                    <h4 class="ms_h4">Contatti</h4>
                    <ul class="ms_ul">
                        <li class="ms_li">
                            Via non lo so 4, Postobello
                        </li>
                        <li class="ms_li">
                            info@boolbnb.com
                        </li>
                    </ul>
                </div>
            </div>
            
            
        </div>

        <div class="container">
            <div class="footer-end">
                <span class="copyright">
                    &copy; 2023 - www.boolbnb.com - All rights reserved
                </span>
            </div>
        </div>
    </footer>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
@use '../style/partials/variables.scss' as*;
    .ms_footer {
        background-color: $secondary-color;
        color: white;
        font-size: 14px;
        padding-top: 30px;

        .navigation {
            margin-bottom: 20px;
        }

        .contacts {
            margin-bottom: 20px;
        }

        .ms_h4 {
            font-size: 20px;
            margin-bottom: 24px;
        }

        .ms_li {
            margin-bottom: 12px;
        }

        .ms_logo {
            max-width: 60%;
            margin-bottom: 24px;
        }

        .ms_p {
            line-height: 24px;
            margin-bottom: 50px;
        }

        .ms_container::after {
            content: '';
            width: 100%;
            height: 1px;
            background-color: white;
            display: block;
        }

        .copyright {
            line-height: 50px;
            font-size: 10px;
        }
    }

</style>