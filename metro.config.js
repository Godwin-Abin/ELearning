const {getDefaultConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
module.exports = async () => {
  const config = await getDefaultConfig(__dirname);

  config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');

  return config;
};
