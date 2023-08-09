
<div class="img-replacement loading" />
<div>
    <div class="title-replacement loading" />
    <div class="price-replacement loading" />
    <div class="buttons-box">
        <div class="button-replacement loading" />
        <div class="button-replacement loading" />
    </div>
</div>



<style>
    .img-replacement {
        width: 100%;
        height: 7em;
        aspect-ratio: 21/10;
        border-radius: 5%;
    }

    .title-replacement {
        height: 1.5em;
        width: 10em;
        margin-bottom: 5px;
    }
    .price-replacement {
        height: 1.4em;
        width: 5em;
        margin-bottom: 5px;
    }
    .button-replacement {
        height: 1.4em;
        width: 1.6em;
        display: inline-block;
    }
    .loading {
        background: #eee;
        background: linear-gradient(
            110deg,
            #ececec 8%,
            #f5f5f5 18%,
            #ececec 33%
        );
        border-radius: 5px;
        background-size: 200% 100%;
        animation: 1.5s shine linear infinite;
    }
    @keyframes shine {
        to {
            background-position-x: -200%;
        }
    }
</style>
