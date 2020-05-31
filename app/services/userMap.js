/**
 * A dictionary that maps between user sessions and their relative instances.
 * Each user needs to have an instance of:
 *   - their personal Spotify API (to get user profile, or to fetch new saved songs)
 *   - a 'Game Manager', to prep the game data, track the game play and return results
 *   - a socket, to manage their communication during the game play
 */

module.exports = {};
