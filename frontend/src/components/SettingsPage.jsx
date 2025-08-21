import { useState } from "react"
import { useApp } from "../state/AppState.jsx"
import AuthModal from "./AuthModal.jsx"

export default function SettingsPage() {
  const {
    user, logout, settings,
    setDarkMode, setBgmEnabled, setBgmProvider,
    setBgmUrl, setBgmSpotifyUrl, setBgmAppleUrl, setBgmVolume
  } = useApp()
  const [authOpen, setAuthOpen] = useState(false)

  const provider = settings.bgmProvider || "url"

  return (
    <div className="p-6">
      <h1 className="text-3xl font-extrabold mb-4">Settings</h1>

      <div className="bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg shadow p-6 max-w-2xl space-y-8">
        {/* Appearance */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Appearance</h2>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={!!settings.darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
            />
            <span>Dark mode</span>
          </label>
        </section>

        {/* Background Music */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Background Music</h2>

          <div className="flex items-center gap-3 mb-4">
            <input
              type="checkbox"
              checked={!!settings.bgmEnabled}
              onChange={(e) => setBgmEnabled(e.target.checked)}
            />
            <span>Enable background music</span>
          </div>

          <label className="block text-sm mb-1 text-gray-500 dark:text-gray-300">Source</label>
          <select
            value={provider}
            onChange={(e) => setBgmProvider(e.target.value)}
            className="w-full border border-gray-200 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-[#0F172A] text-[#0F172A] dark:text-gray-100"
          >
            <option value="url">Direct URL (mp3/ogg)</option>
            <option value="spotify">Spotify Embed</option>
            <option value="apple">Apple Music Embed</option>
          </select>

          {provider === "url" && (
            <div className="mt-4">
              <label className="block text-sm mb-1 text-gray-500 dark:text-gray-300">Track URL</label>
              <input
                type="url"
                placeholder="https://example.com/track.mp3"
                value={settings.bgmUrl}
                onChange={(e) => setBgmUrl(e.target.value)}
                className="w-full border border-gray-200 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-[#0F172A] text-[#0F172A] dark:text-gray-100"
              />
              <div className="mt-4">
                <label className="block text-sm mb-1 text-gray-500 dark:text-gray-300">
                  Volume: {Math.round((settings.bgmVolume ?? 0.4) * 100)}%
                </label>
                <input
                  type="range" min="0" max="1" step="0.01"
                  value={settings.bgmVolume ?? 0.4}
                  onChange={(e) => setBgmVolume(e.target.value)}
                  className="w-full"
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Autoplay may be blocked; click the page once and toggle enable if it doesn’t start.
              </p>
            </div>
          )}

          {provider === "spotify" && (
            <div className="mt-4 space-y-2">
              <label className="block text-sm mb-1 text-gray-500 dark:text-gray-300">Spotify link</label>
              <input
                type="url"
                placeholder="https://open.spotify.com/playlist/... (or track/album)"
                value={settings.bgmSpotifyUrl}
                onChange={(e) => setBgmSpotifyUrl(e.target.value)}
                className="w-full border border-gray-200 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-[#0F172A] text-[#0F172A] dark:text-gray-100"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Playback via the embedded mini-player (bottom-right).
              </p>
            </div>
          )}

          {provider === "apple" && (
            <div className="mt-4 space-y-2">
              <label className="block text-sm mb-1 text-gray-500 dark:text-gray-300">Apple Music link</label>
              <input
                type="url"
                placeholder="https://music.apple.com/us/album/... (or playlist)"
                value={settings.bgmAppleUrl}
                onChange={(e) => setBgmAppleUrl(e.target.value)}
                className="w-full border border-gray-200 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-[#0F172A] text-[#0F172A] dark:text-gray-100"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Playback via the embedded mini-player (bottom-right).
              </p>
            </div>
          )}
        </section>

        {/* Account */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Account</h2>
          {user ? (
            <div className="space-y-2">
              <div className="text-sm text-gray-500 dark:text-gray-300">Signed in as</div>
              <div className="font-semibold">{user.name || user.email}</div>
              {user.name && user.email ? (
                <div className="text-sm text-gray-500 dark:text-gray-300">{user.email}</div>
              ) : null}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={logout}
                  className="px-4 py-2 rounded text-sm font-semibold bg-gray-200 text-[#0F172A] dark:bg-gray-700 dark:text-gray-100"
                >
                  Log out
                </button>
              </div>
            </div>
          ) : (
            <AuthButtons onOpen={() => setAuthOpen(true)} />
          )}
        </section>
      </div>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  )
}

function AuthButtons({ onOpen }) {
  return (
    <div className="space-y-3">
      <div className="text-sm text-gray-500 dark:text-gray-300">You’re not logged in.</div>
      <button
        type="button"
        onClick={onOpen}
        className="px-4 py-2 rounded text-sm font-semibold bg-[#E11D48] text-white"
      >
        Log in / Register
      </button>
    </div>
  )
}
