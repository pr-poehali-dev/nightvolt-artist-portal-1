-- Создание таблиц для личного кабинета NIGHTVOLT

-- Таблица пользователей (артисты и админы)
CREATE TABLE IF NOT EXISTS users (
    uid VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::text,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'artist' CHECK (role IN ('artist', 'admin')),
    label VARCHAR(100) DEFAULT 'NIGHTVOLT',
    avatar_url TEXT,
    bio TEXT,
    social_links JSONB DEFAULT '{}'::jsonb,
    is_blocked BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица истории паролей
CREATE TABLE IF NOT EXISTS password_history (
    id SERIAL PRIMARY KEY,
    user_uid VARCHAR(36) REFERENCES users(uid),
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица релизов
CREATE TABLE IF NOT EXISTS releases (
    id SERIAL PRIMARY KEY,
    artist_uid VARCHAR(36) REFERENCES users(uid),
    type VARCHAR(20) NOT NULL CHECK (type IN ('Single', 'EP', 'Album')),
    cover_url TEXT,
    title VARCHAR(255) NOT NULL,
    release_date DATE NOT NULL,
    main_artist VARCHAR(255) NOT NULL,
    additional_artists TEXT,
    genre VARCHAR(100),
    subgenre VARCHAR(100),
    promo_info TEXT,
    label VARCHAR(100) DEFAULT 'NIGHTVOLT',
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'moderation', 'waiting', 'changes_required', 'rejected', 'published')),
    admin_comment TEXT,
    upc VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица треков
CREATE TABLE IF NOT EXISTS tracks (
    id SERIAL PRIMARY KEY,
    release_id INTEGER REFERENCES releases(id),
    track_order INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    artists TEXT,
    music_author VARCHAR(255),
    lyrics_author VARCHAR(255),
    producers TEXT,
    audio_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица настроек админа
CREATE TABLE IF NOT EXISTS admin_settings (
    key VARCHAR(100) PRIMARY KEY,
    value TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Вставка дефолтного администратора
INSERT INTO users (email, password, role, label) 
VALUES ('admin@nightvolt.app', 'NIGHTVOLT-ROOT-2025', 'admin', 'NIGHTVOLT')
ON CONFLICT (email) DO NOTHING;

-- Вставка настройки промо-поля
INSERT INTO admin_settings (key, value) 
VALUES ('promo_field_enabled', 'true')
ON CONFLICT (key) DO UPDATE SET value = 'true';

-- Индексы для производительности
CREATE INDEX IF NOT EXISTS idx_releases_artist ON releases(artist_uid);
CREATE INDEX IF NOT EXISTS idx_releases_status ON releases(status);
CREATE INDEX IF NOT EXISTS idx_tracks_release ON tracks(release_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_password_history_user ON password_history(user_uid);