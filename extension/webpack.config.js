const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    watch: true,
    watchOptions: {
        ignored: ["**/node_modules", "**/dist"]

    },
    entry: {
        index: "./src/index.tsx",
        inject: "./injection/index.tsx",
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            compilerOptions: { noEmit: false },
                        },
                    },
                ],
                exclude: [
                    path.resolve(__dirname, "node_modules/"),
                    path.resolve(__dirname, "dist/"),
                ]
            },
            {
                test: /\.ts?$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            compilerOptions: { noEmit: false },
                        },
                    },
                ],
                exclude: [
                    path.resolve(__dirname, "node_modules/"),
                    path.resolve(__dirname, "dist/"),
                ]
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader", "postcss-loader"],
                exclude: [
                    path.resolve(__dirname, "node_modules/"),
                    path.resolve(__dirname, "dist/"),
                ]
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "manifest.json", to: "../manifest.json" },
                { from: "src/App.css", to: "../js/App.css" },
                { from: "injection/assets/", to: "../assets/" }
            ],
        }),
        ...getHtmlPlugins(["index"]),
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        path: path.resolve(__dirname, "dist/js"),
        filename: "[name].js",
    },
};

function getHtmlPlugins(chunks) {
    return chunks.map(
        (chunk) =>
            new HTMLPlugin({
                title: "React extension",
                filename: `${chunk}.html`,
                chunks: [chunk],
            })
    );
}
