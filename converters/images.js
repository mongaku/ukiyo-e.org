"use strict";

const jsonlint = require("jsonlint");
const concat = require("concat-stream");
const romajiName = require("romaji-name");

const mapItem = (item) => ({
    id: item.source_id,
    lang: "en",
    title: item.title,
    description: item.description,
    artist: item.artist
        ? romajiName.parseName(item.artist)
        : undefined,
    dates: item.date ? [item.date] : [],
    images: [item.image_file],
    url: item.source_url,
});

module.exports = {
    files: ["Upload a JSON file (.json) containing metadata."],

    processFiles([fileStream], callback) {
        fileStream.pipe(
            concat((fileData) => {
                try {
                    const results = jsonlint.parse(fileData.toString("utf8"));

                    romajiName.init(() => {
                        callback(null, results.map(mapItem));
                    });
                } catch (err) {
                    callback(err);
                }
            })
        );
    },
};
