/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {},
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
      'res.cloudinary.com',
    ],
  },
};

module.exports = nextConfig;
