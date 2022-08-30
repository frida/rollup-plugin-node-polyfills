const EMPTY_PATH = require.resolve('../polyfills/empty.js');

export interface NodePolyfillsOptions {
  sourceMap?: boolean;
  baseDir?: string;
  include?: Array<string | RegExp> | string | RegExp | null;
  exclude?: Array<string | RegExp> | string | RegExp | null;
}

export function builtinsResolver(opts: NodePolyfillsOptions) {
  const libs = new Map();

  libs.set('assert', require.resolve('@frida/assert'));
  libs.set('base64-js', require.resolve('@frida/base64-js'));
  libs.set('buffer', require.resolve('@frida/buffer'));
  libs.set('diagnostics_channel', require.resolve('@frida/diagnostics_channel'));
  libs.set('events', require.resolve('@frida/events'));
  libs.set('fs', require.resolve('frida-fs'));
  libs.set('http', require.resolve('@frida/http'));
  libs.set('https', require.resolve('@frida/https'));
  libs.set('http-parser-js', require.resolve('@frida/http-parser-js'));
  libs.set('ieee754', require.resolve('@frida/ieee754'));
  libs.set('net', require.resolve('@frida/net'));
  libs.set('os', require.resolve('@frida/os'));
  libs.set('path', require.resolve('@frida/path'));
  libs.set('process', require.resolve('@frida/process'));
  libs.set('punycode', require.resolve('@frida/punycode'));
  libs.set('querystring', require.resolve('@frida/querystring'));
  libs.set('readable-stream', require.resolve('@frida/readable-stream'));
  libs.set('_stream_duplex', require.resolve('@frida/readable-stream/lib/duplex'));
  libs.set('_stream_passthrough', require.resolve('@frida/readable-stream/lib/passthrough'));
  libs.set('_stream_readable', require.resolve('@frida/readable-stream/lib/readable'));
  libs.set('_stream_writable', require.resolve('@frida/readable-stream/lib/writable'));
  libs.set('_stream_transform', require.resolve('@frida/readable-stream/lib/transform'));
  libs.set('stream', require.resolve('@frida/stream'));
  libs.set('string_decoder', require.resolve('@frida/string_decoder'));
  libs.set('timers', require.resolve('@frida/timers'));
  libs.set('tty', require.resolve('@frida/tty'));
  libs.set('url', require.resolve('@frida/url'));
  libs.set('util', require.resolve('@frida/util'));
  libs.set('vm', require.resolve('@frida/vm'));

  libs.set('console', require.resolve('../polyfills/console'));
  libs.set('constants', require.resolve('../polyfills/constants'));
  libs.set('zlib', require.resolve('../polyfills/zlib'));
  libs.set('domain', require.resolve('../polyfills/domain'));
  libs.set('sys', libs.get('util'));

  // not shimmed
  libs.set('dns', EMPTY_PATH);
  libs.set('dgram', EMPTY_PATH);
  libs.set('child_process', EMPTY_PATH);
  libs.set('cluster', EMPTY_PATH);
  libs.set('module', EMPTY_PATH);
  libs.set('readline', EMPTY_PATH);
  libs.set('repl', EMPTY_PATH);
  libs.set('tls', EMPTY_PATH);
  libs.set('crypto', EMPTY_PATH);

  return (importee: string) => {
    if (importee && importee.slice(-1) === '/') {
      importee === importee.slice(0, -1);
    }
    if (libs.has(importee)) {
      return {id: libs.get(importee), moduleSideEffects: false};
    }
    return null;
  }
}
