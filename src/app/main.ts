import "dist/libs/materialize.js";
import * as $ from "jquery";
import {ISteamUserService, SteamUserService} from "../services/steamUserService";
import {ISteamProfileViewModel} from "../models/steamProfileViewModel";

export class Main{
    steamUserService: ISteamUserService;

    constructor(){
        this.steamUserService = new SteamUserService();
    }

    run(): void{
        $(document).ready(() => {
            let content: JQuery = $("#content");
            this.steamUserService.getSteamIds();
            let profiles: ISteamProfileViewModel[] = this.steamUserService.getPlayerProfiles();
            this.buildContentGrid(profiles, content);
        });
    }

    private buildContentGrid(profiles: ISteamProfileViewModel[], content: JQuery){
        let html = "<div class='row'>" +
                        "<div class='col s12 m6'>" +
                            "<ul id='content-ul'>";
        let listItems: string = "";

        profiles.forEach((profile: ISteamProfileViewModel) => {
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
    }
}

var main = new Main();
main.run();