<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container">
            
            <!-- LOGO -->
            <a class="navbar-brand" href="#">
                <img class="ms_img" src="logo-boolbnb-nero.png" alt="Bootstrap">
            </a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">

                    <li class="nav-item mx-2">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                    </li>

                    <li class="nav-item mx-2">
                    <a class="nav-link active" aria-current="page" href="#">Ricerca avanzata</a>
                    </li>

                    <li class="nav-item mx-2">
                    <a class="nav-link submit-bottom active rounded-3" aria-current="page" href="#">Iscriviti</a>
                    </li>

                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
@use '../style/partials/variables.scss' as *;
.navbar{
    padding: 20px 0;
    .navbar-collapse{
        flex-grow: 0;
    }

    .ms_img {
        max-width: 10%;
    }

}
.submit-bottom{
    background-color: #177E89;
    color: rgb(247, 247, 247) !important;
    // padding: 10px;
    // width: 70px;
}


</style>