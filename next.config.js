const MillionCompiler = require("@million/lint");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = MillionCompiler.next()(nextConfig);
