import axios from 'axios'

function fetchPlaylists(id) {
  const promises = ['high', 'mid', 'low'].map(name =>
    axios
      .get(`${process.env.OT_CONTENT_BASEURL}/${id}/${name}.m3u8`)
      .then(r => r.data)
  )
  return Promise.all(promises)
}

function replaceKeyfile(m3u8, base64key) {
  const keyUrl = `data:application/pgp-keys;base64,${base64key}`
  return m3u8.replace(/\$keyfile/g, keyUrl)
}

function replaceBaseUrl(m3u8, id) {
  return m3u8.replace(/\$baseurl/g, `${process.env.OT_CONTENT_BASEURL}/${id}`)
}

export function generateUrl(string, type = '') {
  return `data:${type};base64,${btoa(string)}`
}

export function genMasterPlaylist([high, mid, low]) {
  const type = 'application/x-mpegURL'
  let master = '#EXTM3U\n'
  master +=
    '#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=512000,RESOLUTION=640x360\n'
  master += generateUrl(low, type) + '\n'
  master +=
    '#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=2000000,RESOLUTION=1280x720\n'
  master += generateUrl(mid, type) + '\n'
  master +=
    '#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=3000000,RESOLUTION=1920x1080\n'
  master += generateUrl(high, type)
  return master
}

export default async function generateValidMasterPlaylistUrl(id, base64key) {
  const playlists = await fetchPlaylists(id).then(plists =>
    plists
      .map(p => replaceKeyfile(p, base64key))
      .map(p => replaceBaseUrl(p, id))
  )
  return generateUrl(genMasterPlaylist(playlists), 'application/x-mpegURL')
}
