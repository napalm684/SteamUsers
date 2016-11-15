import * as $ from "jquery";
import {ISteamProfileViewModel} from "../models/steamProfileViewModel";
import {ISteamIdViewModel} from "../models/steamIdViewModel";

export interface ISteamUserService{
    getSteamIds();
    getPlayerProfiles();
}

export class SteamUserService implements ISteamUserService{
    private steamIds: string[];
    profiles: ISteamProfileViewModel[];

    constructor(){
        this.steamIds = [];
        this.profiles = [];
    }

    getSteamIds() {
        this.steamIds = [];

        this.getUsersFromJson("dist/users.json")
            .forEach((user: string) =>{
                let url = this.buildUrl(user);
                $.ajax({
                    url: url,
                    async: false,
                    success: (result: any) => {
                        let data: ISteamIdViewModel = result.response;
                        this.steamIds.push(data.steamid);
                    }
                });
            });
    }

    getPlayerProfiles(): ISteamProfileViewModel[]{
        this.profiles = [];

        $.ajax({
            dataType: "json",
            url: this.buildUrl(null, this.getIdString()),
            async: false,
            success: (result: any) => {
                this.profiles = result.response.players as ISteamProfileViewModel[];
            }
        });

        return this.profiles;
    }

    private getUsersFromJson(jsonFile: string): string[]{
        let users: string[] = [];

        $.ajax({
            dataType: "json",
            url: jsonFile,
            async: false,
            success: (data: Array<string>) => {
                users = data;
            }
        });

        return users;
    }

    private buildUrl(playerName: string, steamId: string = null): string{
        if(playerName)
            return `/steamid/${playerName}`;
        if(steamId)
            return `/profiles?ids=${steamId}`;

        return null;
    }

    private getIdString(): string{
        let idString: string;

        this.steamIds.forEach((id: string) => {
            if(!idString)
                idString = id;
            else
                idString = `${idString},${id}`;
        });

        return idString;
    }
}