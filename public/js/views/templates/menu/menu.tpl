<nav class="menu navbar navbar-inverse" role="navigation">
    <div class="main-menu">
        <div class="hdr-header">
            <img id="BSheaderLogo" src="http://academy.binary-studio.com/resources/logo.png" class="hdr-logo"/>
            <div>
                <div class="hdr-buttons">
                    <input id="searchBar" placeholder="Search"/>
                    <a id="userLink" class="hdr-noTextDecoration">
                        <div id="userProfile"></div>
                    </a>
                    <button id="appsBtn" class="hdr-button">
                        <img src="http://team.binary-studio.com/app/images/Thumbnails.png" class="hdr-appsLogo"/>
                    </button>
                    <button id="notificationBtn" class="hdr-button">
                        <img src="http://team.binary-studio.com/app/images/bell.png" class="hdr-appsLogo"/>
                    </button>
                </div>
                <div id="notificationCounter" class="hdr-invisible"></div>
                <div id="search"></div>
            </div>
        </div>
        <div id="logOutBox" class="hdr-invisible hdr-headerElements">
            <div id="userprofileBtnInBox" class="hdr-logOutButtons">
                <button id="userProfileInBoxBtn" class="hdr-userprofileAndLogoutBtn hdr-button">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAADXElEQVRoQ+2ai3HTQBCGow7oAKcCQgU4FQAVxK6ApAJMBSQVoFRAUgGmgiQVoFQAqcD8v2elWZ3Puj3lLqcx7IzGr729/bS3q3u4OjoQqQ6E42gQZLPZzAD6CdcHXHxfQhp0eoPrqqoqvveKFwQAr6D9FdeihOcDfdb47QJAf1ydHRCB+AHFk4lBtO7c482pC9MDCUA8wsDe0GaC5nB+7bG9A+OCMHRnTsNbfD4fGp+ZILZmJU8v8fa90881fOqGfgciDX45yksoE664wD86/c1x5Li9wRqE1KxQrdxCidVqMgIYVi8dGVayczqoQRiNmfK6ox1Dgk7fqXYPvkoTaxc2WYDuVLsGdo9dkI1SeISChjL1KcWCUeVdYgnXUuPDl+fmGvpoYKcrALC3DYaOiAb5id/nJu9FSXLsOz4OlW3W/wUuvvJm0akoQT9rNOiinQOEIY999tRwZBlDkhUExldw5nOMQ0qXw43tTZINRPKChcLNCZNjomQuLDlBOObd+h4DQV3On1j+g5ITxK3tQWc8CuZnVk4Q9/kzBsRcJXOC6LI9BmLbpi2jIQP/QQx3KEVEnhARU9XLGZEUyT6JHOG8isvi50hvbTFkKGdE3On/GKBJlN81PNdT9jEgkxhaBwOSYmhNIkfcVduYoXWK8svIBiVbsrNnGK/x4u6+BJ0SBXN+SF+9oZxjYTUGhntlJzHr+awRkTvFHRcudWPEPH1vjWYHEZgGr76dQR/cE76cxUTjRYaWdLLAq3WRFbXEfdGICIxl7hWdGyVAVug0tBERnRslQHgkMQ9k/BK5wSoXLVmTXXZSON9ijlj2i7lBx1kznyEsEGZJDiLO8yFI52M35rTjBGFecQa8DhElA5GtUeYAAVILoVYAut5nOBak2+XWBmGEAKvU3nvsEYh5tBMh+PAbv3XLYt8UhY31w+wtlHjExbkUG5Y4V7yEDxctqOdYgccV22E9dNBzA6WPBSFa/7uNbvjCKZAuJt6DnhmU3KM3DiMepIyd2aYahe2OffjoTYZQPQGnrfC9xZjveJoJ9sZqrZDeA/qd6wnnvj8MTBlmB6KX7PrOSoJzLV46N9yAX+ELPmc4M+iJ5U81nEqwUljXGalHG2fKfPKzFDf7jP8bf3NKfWtz2vsLW+k7UaxgsbwAAAAASUVORK5CYII=" class="hdr-userprofileAndLogoutImg"/>
                </button>
            </div>
            <div id="logOutBtnInBox" class="hdr-logOutButtons">
                <button id="logOutButton" class="hdr-userprofileAndLogoutBtn hdr-button">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAB+0lEQVRoQ+2ajU3DMBCFkw26AWECugEdoUxA2KCdgDIBMAHpBnQDmICOEDZgg/Ce5KDIOPFVtiM7sqWoVeOf+3zPd47TslhIKRfCUWSQ2Dwp9kjXdRsYf4+rmgmixTjHsiw/JOOJQACxQ2fPkg4D1NkD5sXWrxUEEGt08mXrKPD9a8DQQ6NFAnJA68fAhtq6fwII7XACoUZvBz0c8b2xjex4v0Z7rse+nACy9Q1inR1HiAJy1lXwCZBNBuEMYHZ0aWWPSCWXpTU1U1laUh0Z6qkkzBB/o26nGbVUkFnhk1sT5pM0QNRerkGu+NEdhHtMjtskEqJah1cw+A4Gnw0wKxPksJ5krxU8j2gBZQejXy9dYjGCkOEd14PNC7F7pLevHZOayVuxemRoq0hqQUGg/e5SrY/Ut0otFRDyTUotJZBvlU/+hWdSpgJygq31VBQLCiJdH4aN6bCpt1OUuRNiDzEpJX2SYvWIVUopgIikFDNINRaVsIaS2TTySDb9bbwputEL+J3nzTWuNB6sdBD1qPuG33nuzJIsyAHGD8+bM8ift/NxkHR/YqiXTxqnJm/J0mqYvByUI2nK3MGrL15e9OihUGKI7zrWVxmS3e8yXoZyahfxerrXiPrDAHVb+dbNSH8t16LXPwzMZLjTMNY14tT7jI0zyIyTLRrqF74MkEI5G3CLAAAAAElFTkSuQmCC" class="hdr-userprofileAndLogoutImg"/>
                </button>
            </div>
        </div>
        <div id="appsBlock" class="hdr-invisible">
            <div id="appsList"></div>
        </div>
        <div id="notificationBlock" class="hdr-invisible">
            <ul id="notificationList"></ul>
            <a id="readAllBtn" href="" class="hdr-noTextDecoration hdr-specialNotifBtn">
                <img width="20" height="20" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABx0lEQVRYR+2V71ECQQzFpQK1ArECoQKxAulArECtQKxArUDsQCuQDtQKxArUCvT9mA0T497eMn7gy2Umw93m38u7ZOltbVh6G66/1QHoGOgYWIeBgVa2L31oWd2x7AvpS82K1wCYKNGl9FVK8hoB5IF0Kr0vBZQAjBR4LaXzr9T9Z011+ewkFrYTExf6nedimwDcyPnMBVylbuyIAneOETo+lXqAdA9zJuQEyC+JAEj8lLr2jsPUiZ3RzWHIxdmRO4O55+DDXOCzAuoBEEBxQJSAYv/I+HC065Pr+TvjR3FALIfUAJSKez+e+9K3BgD7Ol84Ww4A5hUIAJAQqnKdW66YGPRMuRe2hEZMSkANxNAAkJCJbRIGbOaMFOLdQFB8IvW7f653tqhJ2KyB/wTzAoiFbLAQxTrOXTrE7DVUp/gIwHEISyBuFUBXNQI7J23Fscc17OvMbrFcfHaXg2O8Q7zZblPYWUrtReSTEDyVPkptnxng43ROEznJMli6iuOg1VCf88kN6Mqv9s+Ibx/Xrg0Qhfkcs5JjDQCLh5GJdCxtmu532ZghiuY24w+WdQDEYADZ5cUsVBWMSf4DoO0TVNk7AB0DHQM/erlWYU85QycAAAAASUVORK5CYII="/>
            </a>
            <a href="http://team.binary-studio.com/app/#/" class="hdr-noTextDecoration hdr-specialNotifBtn">
                <img width="20" height="20" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB30lEQVRYR+2W7VHCQBCGoQK1A60ArECsQK1ArECtAKwArMBYgXYAVqBWoFagVqDvw+w6R8jlQ0jyh5vZ4QJ3+z63Hxe6nZZHt2X9zhaACIxlP22lAgDEX2VfDUPsSq/nAMd6mDcMMJDezAGu9TBtGIDUjxwA7UR20RAEWudoOcCN5leyBxnRqKseyPudjJQT8b8I8AWi1MGbLdg0BOIz2YGM/C+e00XIl0DQGaTjZUMp6Vt0v02cwwGxAoAeEI+ynkViXQjEOfmTbGiRRicK4IdONDmRURPM/zMQJOf3Jh76KARgMYU5kZGOqhC+N9bipQCA8FMAULZNWUub5YGXBgDCHVIbOI11iLfZqe3JAy4FkO5bovEp87YNc+pttmfipIDiiwEXAlC9FBAOORHd4G26Y47nRoAzLrEPGXMixH4iBnBWS+cCIIg4b0nmYciBSGR0yLsB7OuTSufUWWuPDAIgH1GAqVZcyriex8GG9BRR4Bg4dpisLfgZmT/8MlYACDFhPJQNzWmOfuWfvDCftfNMtrigwtcxp+aqRHzd2y9Gh2gio4ZuZZPwdZyVw8rHLLEhrKGl1zF5anKgt/Q6njepLq1BWAPkPHa71cVFKvr+t7wukUK/ALQ6tgCtR+AX0EuQCjZ0KYUAAAAASUVORK5CYII="/>
            </a>
            <a href="http://team.binary-studio.com/app/#/settings" class="hdr-noTextDecoration hdr-specialNotifBtn">
                <img width="20" height="20" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACL0lEQVRYR9WXgVHDMAxF2wlgA8oEwASUDcoElAmADdIJgAkoE9BOQDegbFAmACYAPc7OqYocJ21zPXTna2NbX1+yJCf93mbyIGo3RnUiz0VbuH5bhbB/Ib/nRncuz6O2eJsS+BRDh8bYSp6Pd0XgVIBeZNzJmBlQDEPAE88honIv41LG0ip5Chh/VR5OA5GvoMzZkwOeXMsk+xGIYngcntG/sCQsAWs8GlkFYMAGCeN6LwTZC56WCglLAENHGQPbLr9rYpbAUBYJf5fCMSyiAS8HvBrfFaFHAbrVYB4BkgeGJ7uyGnDWQl8XAda6iAIlXameVCPyGo0NCB7FuibbcxEjwSuNyhIg/FceU2X9W/4Xzh7OlvmDmqMbyxotO/aUHgRoFnjAsO3Vw9LNxq5DArycQIDoLSHwk9ut1t1EMvoA546jVGlL4Fk0CWOdTGWRY2wk/44A4T3LuPYW8qlxBIqgQBI2uQfceg7Wmibhh05CyzQHQgZDmraqhWua+bpKqlRQqhGtGkTjr4wCg1jGdWHH64HdkCKw11ZMCEmkCttGWZXeRLS4issuyFYvAk8yP97SWEo9ex2PRJOX0S6Fl9NZNLCPV7K1ZPReShfCzt5o3AFTGZRorldggCTmGO2dwE06lBGrx80BSkqTsOcGMHniia1zXU0V4wCkyhAS0WPIaKFK2nyY4DFY5FfpeQRMEUg4WE5TSvaY3EaTA9qUAFHZ68ep1yknQqrIeWzXfwFZJHIs2+DwVAAAAABJRU5ErkJggg=="/>
            </a>
        </div>
    </div>
    <div class="custom-menu">
        <button class="menu-list-control button">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <button class="language button lang"><%= _t("app.currentLanguage") %></button>
    </div>
    <ul class="menu-list hdr-invisible">
        <li><a id="nav-question" href="#questions"><%= _t("questions.all") %></a></li>
        <li><a id="nav-question-add"><%= _t("questions.add") %></a></li>
        <li><a href="#activity"><%= _t("questions.my") %></a></li>
        <li><a id="nav-tags" href="#tags"><%= _t("tags.tags") %></a></li>

        <% if (admin) { %>
        <li><a id="nav-question" href="#folders"><%= _t("folders.folders") %></a></li>
        <li><a id="nav-question" href="#edit-users"><%= _t("users.users") %></a></li>
        <% } %>
    </ul>

    <ul class="lang-list hdr-invisible">
        <li><span data-lang="en-US">EN</span></li>
        <li><span data-lang="uk-UA">UA</span></li>
        <li><span data-lang="ru-RU">RU</span></li>
    </ul>
</nav>