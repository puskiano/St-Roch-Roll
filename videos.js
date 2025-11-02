// ===== Guitar Videos Library =====
// Manages video collection, filtering, and YouTube player integration

class VideoLibrary {
    constructor() {
        // Video Database
        this.videos = [
            // Rock
            {
                id: 'dQw4w9WgXcQ',
                title: 'Stairway to Heaven - Led Zeppelin (Guitar Solo)',
                artist: 'Led Zeppelin',
                style: 'rock',
                song: 'Stairway to Heaven',
                duration: '8:02'
            },
            {
                id: 'fJ9rUzIMcZQ',
                title: 'Bohemian Rhapsody - Queen (Guitar Cover)',
                artist: 'Queen',
                style: 'rock',
                song: 'Bohemian Rhapsody',
                duration: '5:55'
            },
            {
                id: '1w7OgIMMRc4',
                title: 'Sweet Child O\' Mine - Guns N\' Roses (Tutorial)',
                artist: 'Guns N\' Roses',
                style: 'rock',
                song: 'Sweet Child O\' Mine',
                duration: '5:56'
            },
            {
                id: 'kXYiU_JCYtU',
                title: 'Smells Like Teen Spirit - Nirvana (Riff)',
                artist: 'Nirvana',
                style: 'rock',
                song: 'Smells Like Teen Spirit',
                duration: '5:01'
            },

            // Blues
            {
                id: 'KC5H9P4F5Uk',
                title: 'The Thrill Is Gone - B.B. King',
                artist: 'B.B. King',
                style: 'blues',
                song: 'The Thrill Is Gone',
                duration: '5:25'
            },
            {
                id: 'iP1NPWuTW-A',
                title: 'Red House - Jimi Hendrix',
                artist: 'Jimi Hendrix',
                style: 'blues',
                song: 'Red House',
                duration: '5:44'
            },
            {
                id: 'rY-FJvRqK0E',
                title: 'Texas Flood - Stevie Ray Vaughan',
                artist: 'Stevie Ray Vaughan',
                style: 'blues',
                song: 'Texas Flood',
                duration: '5:21'
            },

            // Metal
            {
                id: 'NOjG5usM-Bc',
                title: 'Master of Puppets - Metallica',
                artist: 'Metallica',
                style: 'metal',
                song: 'Master of Puppets',
                duration: '8:35'
            },
            {
                id: 'CD-E-LDc384',
                title: 'Crazy Train - Ozzy Osbourne (Solo)',
                artist: 'Ozzy Osbourne',
                style: 'metal',
                song: 'Crazy Train',
                duration: '4:53'
            },
            {
                id: 'PXhKr0YRgVc',
                title: 'Eruption - Van Halen',
                artist: 'Van Halen',
                style: 'metal',
                song: 'Eruption',
                duration: '1:42'
            },

            // Jazz
            {
                id: 'E0WBwChJ_Uc',
                title: 'Autumn Leaves - Jazz Guitar',
                artist: 'Various',
                style: 'jazz',
                song: 'Autumn Leaves',
                duration: '4:32'
            },
            {
                id: 'w1rZSIVqRwc',
                title: 'All Blues - Miles Davis (Guitar)',
                artist: 'Miles Davis',
                style: 'jazz',
                song: 'All Blues',
                duration: '11:33'
            },
            {
                id: 'kEhRy2ax8mw',
                title: 'Round Midnight - Jazz Guitar Solo',
                artist: 'Thelonious Monk',
                style: 'jazz',
                song: 'Round Midnight',
                duration: '5:45'
            },

            // Classique
            {
                id: 'oEfFbuT3YXY',
                title: 'Asturias - Isaac Albéniz',
                artist: 'Isaac Albéniz',
                style: 'classique',
                song: 'Asturias',
                duration: '6:42'
            },
            {
                id: '2CtpVvWZewo',
                title: 'Recuerdos de la Alhambra - Francisco Tárrega',
                artist: 'Francisco Tárrega',
                style: 'classique',
                song: 'Recuerdos de la Alhambra',
                duration: '4:28'
            },
            {
                id: 'YeKcOJJq4j4',
                title: 'Romance Anónimo - Guitare Classique',
                artist: 'Anonyme',
                style: 'classique',
                song: 'Romance',
                duration: '3:15'
            },

            // Folk
            {
                id: 'eHnGwDy2y6s',
                title: 'Blackbird - The Beatles',
                artist: 'The Beatles',
                style: 'folk',
                song: 'Blackbird',
                duration: '2:18'
            },
            {
                id: 'ktvTqknDobU',
                title: 'The Boxer - Simon & Garfunkel',
                artist: 'Simon & Garfunkel',
                style: 'folk',
                song: 'The Boxer',
                duration: '5:08'
            },
            {
                id: 'iY4LFNxJSZ0',
                title: 'Dust in the Wind - Kansas',
                artist: 'Kansas',
                style: 'folk',
                song: 'Dust in the Wind',
                duration: '3:28'
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
