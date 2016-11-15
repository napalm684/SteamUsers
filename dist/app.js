require.config({
    baseUrl: 'dist/libs',
    paths: {
        'materialize': 'materialize',
        'jquery': 'jquery'
    },
    shim: {
        'materialize': {
            deps: ['jquery'],
            exports: "$"
        }
    }
});
require(["app/main"]);
define("models/steamProfileViewModel", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("models/steamIdViewModel", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("services/steamUserService", ["require", "exports", "jquery"], function (require, exports, $) {
    "use strict";
    var SteamUserService = (function () {
        function SteamUserService() {
            this.steamIds = [];
            this.profiles = [];
        }
        SteamUserService.prototype.getSteamIds = function () {
            var _this = this;
            this.steamIds = [];
            this.getUsersFromJson("dist/users.json")
                .forEach(function (user) {
                var url = _this.buildUrl(user);
                $.ajax({
                    url: url,
                    async: false,
                    success: function (result) {
                        var data = result.response;
                        _this.steamIds.push(data.steamid);
                    }
                });
            });
        };
        SteamUserService.prototype.getPlayerProfiles = function () {
            var _this = this;
            this.profiles = [];
            $.ajax({
                dataType: "json",
                url: this.buildUrl(null, this.getIdString()),
                async: false,
                success: function (result) {
                    _this.profiles = result.response.players;
                }
            });
            return this.profiles;
        };
        SteamUserService.prototype.getUsersFromJson = function (jsonFile) {
            var users = [];
            $.ajax({
                dataType: "json",
                url: jsonFile,
                async: false,
                success: function (data) {
                    users = data;
                }
            });
            return users;
        };
        SteamUserService.prototype.buildUrl = function (playerName, steamId) {
            if (steamId === void 0) { steamId = null; }
            if (playerName)
                return "/steamid/" + playerName;
            if (steamId)
                return "/profiles?ids=" + steamId;
            return null;
        };
        SteamUserService.prototype.getIdString = function () {
            var idString;
            this.steamIds.forEach(function (id) {
                if (!idString)
                    idString = id;
                else
                    idString = idString + "," + id;
            });
            return idString;
        };
        return SteamUserService;
    }());
    exports.SteamUserService = SteamUserService;
});
define("app/main", ["require", "exports", "jquery", "services/steamUserService", "dist/libs/materialize.js"], function (require, exports, $, steamUserService_1) {
    "use strict";
    var Main = (function () {
        function Main() {
            this.steamUserService = new steamUserService_1.SteamUserService();
        }
        Main.prototype.run = function () {
            var _this = this;
            $(document).ready(function () {
                var content = $("#content");
                _this.steamUserService.getSteamIds();
                var profiles = _this.steamUserService.getPlayerProfiles();
                _this.buildContentGrid(profiles, content);
            });
        };
        Main.prototype.buildContentGrid = function (profiles, content) {
            var html = "<div class='row'>" +
                "<div class='col s12 m6'>" +
                "<ul id='content-ul'>";
            var listItems = "";
            profiles.forEach(function (profile) {
                listItems = listItems + "<li>" +
                    "<div class='card horizontal'>" +
                    "<div class='card-image'>" +
                    "<img src='" + profile.avatarfull + "'/>" +
                    "</div>" +
                    "<div class='card-stacked'>" +
                    "<div class='card-content'>" +
                    "<p>" + profile.personaname + "</p>" +
                    "</div>" +
                    "<div class='card-action'>" +
                    "<a href=''#'>This is a link</a>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</li>";
            });
            html = html + listItems + "</ul></div></div>";
            content.append(html);
            Materialize.showStaggeredList("#content-ul");
        };
        return Main;
    }());
    exports.Main = Main;
    var main = new Main();
    main.run();
});
//# sourceMappingURL=app.js.map