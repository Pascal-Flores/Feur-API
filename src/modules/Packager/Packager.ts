import { readdirSync, rmdirSync, statSync } from "fs";
import OutputFormat from "../OutputFormat";
import { spawnSync } from "child_process";

class Packager {

    public static async packageFullManga(fullMangaPath : string, outputFormat : OutputFormat) : Promise<void> {
        readdirSync(fullMangaPath).filter( (file) => statSync(fullMangaPath + "/" + file).isDirectory() ).forEach( (dir) => {
            this.packageTome(fullMangaPath + "/" + dir, outputFormat);
            rmdirSync(fullMangaPath + "/" + dir, { recursive: true });
        });

        spawnSync("zip", ["-r", fullMangaPath + ".zip", fullMangaPath + "/"]);

    }

    public static async packageTome(tomePath : string, outputFormat: OutputFormat) : Promise<void> {
        switch (outputFormat) {
            case OutputFormat.CBZ:
                spawnSync("zip", ["-r", tomePath + ".cbz", tomePath + "/"]);
                break;
            case OutputFormat.CBR:
                spawnSync("rar", ["a", tomePath + ".cbr", tomePath + "/"]);
                break;
            case OutputFormat.RAW:
                break;
            default:
                break;
        }
    }
}

export default Packager;