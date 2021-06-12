<template>
    <div id="footer">
        <!-- <hr/> -->
        <div id="hrLine"> </div>
        <p> Made with <b-icon icon="suit-heart-fill" aria-hidden="true" font-scale="1"></b-icon> by Nuxt</p>
        <div id="icons">
            <b-link href="mailto:pawansoni76@gmail.com" target="_blank"><b-icon icon="envelope-fill" aria-hidden="true" font-scale="1.5"></b-icon> </b-link>
            <b-link href="https://www.facebook.com/pwnsni/" target="_blank"><b-icon icon="facebook" aria-hidden="true" font-scale="1.5"></b-icon> </b-link>
            <b-link href="https://github.com/pwnsoni/" target="_blank"><b-icon icon="github" aria-hidden="true" font-scale="1.5"></b-icon> </b-link>
            <b-link href="https://www.linkedin.com/in/pwnsoni/" target="_blank"><b-icon icon="linkedin" aria-hidden="true" font-scale="1.5"></b-icon> </b-link>
            
        </div>
    </div>
</template>


<style scoped>
    #footer{
        min-width: 100vw;
        background: rgb(220, 247, 248);
        /* padding-top: 50px; */
    }

    #hrLine{
        max-width: 100vw;
        height: 1px;
        text-align: center;
        background: blue;
        /* padding-top: 20px;
        padding-bottom: 20px; */
        margin: 30px;

    }

    #icons{
        /* background: red; */
        /* justify-content: center; */
        padding: 4px;
        padding-top: 1px;
        padding-bottom: 10px;
        word-spacing: 2vw;
        text-align: center;
        min-width: 100vw;
    }
    p{
        text-align: center;
        color: blue;
        word-spacing: 4px;
    }

</style>