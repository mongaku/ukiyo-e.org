"use strict";

module.exports = {
    getTitle: (i18n) => i18n.gettext("Ukiyo-e.org"),
    getShortTitle: (i18n) => i18n.gettext("Ukiyo-e.org"),

    converters: {
        images: require("./converters/images.js"),
    },

    types: {
        images: {
            imagesRequired: true,
            dbName: "ukiyoe-images",

            name: (i18n) => i18n.gettext("Images"),

            filters: ["artist", "dates"],
            display: ["artist", "dates", "description"],
            sorts: {
                "created.desc": (i18n) => i18n.gettext("Added recently"),
                "created.asc": (i18n) => i18n.gettext("Oldest first"),
            },

            recordTitle(record) {
                const title = record.title || `Untitled Print`;
                const artist = record.artist[0] && record.artist[0].name;

                if (artist) {
                    return `${title} by ${artist}`;
                }

                return title;
            },

            model: {
                // The title of the record.
                title: {
                    type: "SimpleString",
                    title: (i18n) => i18n.gettext("Title"),
                    recommended: true,
                },

                artist: {
                    type: "Name",
                    title: (i18n) => i18n.gettext("Artist"),
                    placeholder: (i18n) =>
                        i18n.gettext("Sample: Hokusai"),
                    multiple: true,
                    recommended: true,
                },

                // Date ranges when the record was created or modified.
                dates: {
                    type: "YearRange",
                    searchName: "date",
                    ranges: [
                        { from: 1700, to: 1799 },
                        { from: 1800, to: 1867 },
                        { from: 1868, to: 1912 },
                        { from: 1913 },
                    ],
                    title: (i18n) => i18n.gettext("Date"),
                    placeholder: () => ({
                        end: 1970,
                        start: 1700,
                    }),
                },

                description: {
                    type: "SimpleString",
                    title: (i18n) => i18n.gettext("Description"),
                    recommended: true,
                    multiline: true,
                },

                url: {
                    type: "URL",
                    title: (i18n) => i18n.gettext("Source"),
                    required: true,
                },
            },
        },
    },
};
