// ===== Guitar Videos Library =====
// Manages video collection, filtering, and YouTube player integration

class VideoLibrary {
    constructor() {
        // Video Database
        // Note: Ces vidéos sont des exemples. Remplacez les IDs par vos propres vidéos YouTube.
        this.videos = [
            // Rock - Tutoriels et covers
            {
                id: 'fJ9rUzIMcZQ',
                title: 'Bohemian Rhapsody - Queen (Guitar Tutorial)',
                artist: 'Queen',
                style: 'rock',
                song: 'Bohemian Rhapsody',
                duration: '5:55'
            },
            {
                id: '1w7OgIMMRc4',
                title: 'Sweet Child O\' Mine - Intro Guitar Lesson',
                artist: 'Guns N\' Roses',
                style: 'rock',
                song: 'Sweet Child O\' Mine',
                duration: '5:56'
            },
            {
                id: 'qR7U1HIhxfA',
                title: 'Hotel California - Guitar Solo Tutorial',
                artist: 'Eagles',
                style: 'rock',
                song: 'Hotel California',
                duration: '6:30'
            },
            {
                id: 'rU3aFlHD2lc',
                title: 'Wonderwall - Oasis (Acoustic Guitar)',
                artist: 'Oasis',
                style: 'rock',
                song: 'Wonderwall',
                duration: '4:18'
            },

            // Blues - Leçons et performances
            {
                id: '4fk2prKnYnI',
                title: 'Blues Guitar Lesson - 12 Bar Blues',
                artist: 'Tutorial',
                style: 'blues',
                song: '12 Bar Blues',
                duration: '10:25'
            },
            {
                id: 'Fo6aKnRnBxM',
                title: 'Pentatonic Scale - Blues Guitar',
                artist: 'Tutorial',
                style: 'blues',
                song: 'Pentatonic Blues',
                duration: '8:44'
            },
            {
                id: 'wJTCaVkiv6I',
                title: 'Blues Shuffle Rhythm Guitar',
                artist: 'Tutorial',
                style: 'blues',
                song: 'Blues Shuffle',
                duration: '7:21'
            },

            // Metal - Riffs et techniques
            {
                id: 'xnKhsTXoKCI',
                title: 'Metallica - Enter Sandman (Guitar Tutorial)',
                artist: 'Metallica',
                style: 'metal',
                song: 'Enter Sandman',
                duration: '5:32'
            },
            {
                id: 'hF_-5pZ_kxY',
                title: 'AC/DC - Back in Black (Riff Tutorial)',
                artist: 'AC/DC',
                style: 'metal',
                song: 'Back in Black',
                duration: '4:53'
            },
            {
                id: 'L_XJ_s5IsQc',
                title: 'Power Chords - Metal Guitar Basics',
                artist: 'Tutorial',
                style: 'metal',
                song: 'Power Chords',
                duration: '6:15'
            },

            // Jazz - Standards et techniques
            {
                id: 'vmDDOFXSgAs',
                title: 'Jazz Guitar Chords - Beautiful Voicings',
                artist: 'Tutorial',
                style: 'jazz',
                song: 'Jazz Chords',
                duration: '9:32'
            },
            {
                id: 'nPGA3vjMLgE',
                title: 'Autumn Leaves - Jazz Guitar',
                artist: 'Tutorial',
                style: 'jazz',
                song: 'Autumn Leaves',
                duration: '12:18'
            },
            {
                id: 'k9aF_CxCSro',
                title: 'Jazz Blues Comping - Rhythm Guitar',
                artist: 'Tutorial',
                style: 'jazz',
                song: 'Jazz Blues',
                duration: '8:45'
            },

            // Classique - Pièces célèbres
            {
                id: 'oEfFbuT3YXY',
                title: 'Asturias (Leyenda) - Isaac Albéniz',
                artist: 'Isaac Albéniz',
                style: 'classique',
                song: 'Asturias',
                duration: '6:42'
            },
            {
                id: 'FExCt7JKTS8',
                title: 'Classical Guitar Lesson - Beginner',
                artist: 'Tutorial',
                style: 'classique',
                song: 'Classical Basics',
                duration: '10:28'
            },
            {
                id: 'V6fHTyVmJJ4',
                title: 'Cavatina - Classical Guitar',
                artist: 'Stanley Myers',
                style: 'classique',
                song: 'Cavatina',
                duration: '3:45'
            },

            // Folk - Fingerstyle et acoustique
            {
                id: 'JsD6uEZsIsU',
                title: 'Fingerstyle Guitar - Tutorial Débutant',
                artist: 'Tutorial',
                style: 'folk',
                song: 'Fingerstyle Basics',
                duration: '11:18'
            },
            {
                id: 'YQlyHbu0zz4',
                title: 'Dust in the Wind - Kansas (Tutorial)',
                artist: 'Kansas',
                style: 'folk',
                song: 'Dust in the Wind',
                duration: '8:28'
            },
            {
                id: 'Sf-_1ډգOA',
                title: 'The Boxer - Simon & Garfunkel',
                artist: 'Simon & Garfunkel',
                style: 'folk',
                song: 'The Boxer',
                duration: '5:08'
            },
            {
                id: 'f7McpVPlidc',
                title: 'Acoustic Fingerpicking Patterns',
                artist: 'Tutorial',
                style: 'folk',
                song: 'Fingerpicking',
                duration: '9:45'
            }
        ];

        // Current filters
        this.currentStyle = 'all';
        this.searchTerm = '';

        // DOM Elements
        this.elements = {
            tabButtons: document.querySelectorAll('.tab-btn'),
            tabContents: document.querySelectorAll('.tab-content'),
            styleFilters: document.querySelectorAll('#styleFilters .filter-btn'),
            songSearch: document.getElementById('songSearch'),
            videosGrid: document.getElementById('videosGrid'),
            emptyState: document.getElementById('emptyState'),
            videoPlayerContainer: document.getElementById('videoPlayerContainer'),
            videoPlayer: document.getElementById('videoPlayer'),
            closePlayer: document.getElementById('closePlayer'),
            currentVideoTitle: document.getElementById('currentVideoTitle'),
            currentVideoStyle: document.getElementById('currentVideoStyle'),
            currentVideoArtist: document.getElementById('currentVideoArtist')
        };

        this.init();
    }

    init() {
        // Tab navigation
        this.elements.tabButtons.forEach(btn => {
            btn.addEventListener('click', () => this.switchTab(btn.dataset.tab));
        });

        // Style filters
        this.elements.styleFilters.forEach(btn => {
            btn.addEventListener('click', () => this.filterByStyle(btn.dataset.filter));
        });

        // Search input
        this.elements.songSearch.addEventListener('input', (e) => {
            this.searchTerm = e.target.value.toLowerCase();
            this.renderVideos();
        });

        // Close player
        this.elements.closePlayer.addEventListener('click', () => this.closeVideoPlayer());

        // Initial render
        this.renderVideos();

        console.log('📺 Video Library initialized with', this.videos.length, 'videos');
    }

    // Switch between tabs
    switchTab(tabName) {
        // Update tab buttons
        this.elements.tabButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });

        // Update tab contents
        this.elements.tabContents.forEach(content => {
            const contentId = tabName + '-section';
            content.classList.toggle('active', content.id === contentId);
        });

        // Close video player when switching tabs
        if (tabName === 'tuner') {
            this.closeVideoPlayer();
        }
    }

    // Filter videos by style
    filterByStyle(style) {
        this.currentStyle = style;

        // Update filter buttons
        this.elements.styleFilters.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === style);
        });

        this.renderVideos();
    }

    // Get filtered videos
    getFilteredVideos() {
        return this.videos.filter(video => {
            // Filter by style
            const styleMatch = this.currentStyle === 'all' || video.style === this.currentStyle;

            // Filter by search term
            const searchMatch = this.searchTerm === '' ||
                video.title.toLowerCase().includes(this.searchTerm) ||
                video.song.toLowerCase().includes(this.searchTerm) ||
                video.artist.toLowerCase().includes(this.searchTerm);

            return styleMatch && searchMatch;
        });
    }

    // Render videos grid
    renderVideos() {
        const filteredVideos = this.getFilteredVideos();

        if (filteredVideos.length === 0) {
            this.elements.videosGrid.style.display = 'none';
            this.elements.emptyState.style.display = 'block';
            return;
        }

        this.elements.videosGrid.style.display = 'grid';
        this.elements.emptyState.style.display = 'none';

        this.elements.videosGrid.innerHTML = filteredVideos.map(video => `
            <div class="video-card" onclick="videoLibrary.playVideo('${video.id}', '${this.escapeHtml(video.title)}', '${video.style}', '${this.escapeHtml(video.artist)}')">
                <div class="video-thumbnail">
                    <img src="https://img.youtube.com/vi/${video.id}/mqdefault.jpg"
                         alt="${this.escapeHtml(video.title)}"
                         loading="lazy">
                    <div class="video-play-overlay">▶</div>
                    <div class="video-duration">${video.duration}</div>
                </div>
                <div class="video-card-content">
                    <h4 class="video-title">${this.escapeHtml(video.title)}</h4>
                    <div class="video-meta">
                        <span class="video-badge style">${this.capitalizeFirst(video.style)}</span>
                        <span class="video-badge">${this.escapeHtml(video.song)}</span>
                    </div>
                    <div class="video-artist">${this.escapeHtml(video.artist)}</div>
                </div>
            </div>
        `).join('');
    }

    // Play video in embedded player
    playVideo(videoId, title, style, artist) {
        // Build YouTube embed URL with autoplay
        const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

        // Update player
        this.elements.videoPlayer.src = embedUrl;
        this.elements.currentVideoTitle.textContent = title;
        this.elements.currentVideoStyle.textContent = this.capitalizeFirst(style);
        this.elements.currentVideoArtist.textContent = artist;

        // Show player
        this.elements.videoPlayerContainer.style.display = 'block';

        // Scroll to player
        this.elements.videoPlayerContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Close video player
    closeVideoPlayer() {
        this.elements.videoPlayerContainer.style.display = 'none';
        this.elements.videoPlayer.src = '';
    }

    // Utility: Escape HTML
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Utility: Capitalize first letter
    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

// Initialize Video Library when DOM is loaded
let videoLibrary;
document.addEventListener('DOMContentLoaded', () => {
    videoLibrary = new VideoLibrary();
});
