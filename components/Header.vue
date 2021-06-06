<template>

    <div id="head">
        <div id="content">
            <span> <b-icon icon="house-fill" aria-hidden="true" scale="2"></b-icon> </span>
            <span> <b-icon icon="house-fill" aria-hidden="true" scale="2"></b-icon> </span>
        </div>
        <hr/>
    </div>    
</template>

<style scoped>

    hr{
        color: blue;
    }

    #content{
        background: rgb(220, 247, 248);
        max-width: 100vw;
        min-width: 100vw;
        height: 40px;
        display: flex;
        justify-content: space-between;
        transition: 0.5s;
        text-align: center;
        padding: 1vh;
        padding-left: 30vw;
        padding-right: 30vw;
    }

</style>