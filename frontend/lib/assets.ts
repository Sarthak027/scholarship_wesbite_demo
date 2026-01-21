/**
 * Asset URL Helper
 * Generates correct URLs for static assets served from backend
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5005';

/**
 * Get the full URL for an asset stored in backend/uploads
 * @param path - Path relative to uploads folder (e.g., '/logos/nav_logo1.png')
 * @returns Full URL to the asset
 */
export function getAssetUrl(path: string): string {
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${API_URL}/${cleanPath}`;
}

/**
 * Common asset paths for easy reference
 */
export const ASSETS = {
    logos: {
        nav: getAssetUrl('/uploads/logos/nav_logo1.png'),
        footer: getAssetUrl('/uploads/logos/footer_logo.png'),
        alliance: getAssetUrl('/uploads/logos/Alliance University.jpg'),
        amity: getAssetUrl('/uploads/logos/Amity University.png'),
        dailyhunt: getAssetUrl('/uploads/logos/Dailyhunt.png'),
        forbes: getAssetUrl('/uploads/logos/Forbes India.png'),
        gibs: getAssetUrl('/uploads/logos/GIBS Business School.png'),
        hindustan: getAssetUrl('/uploads/logos/Hindustan Times.png'),
        iilm: getAssetUrl('/uploads/logos/IILM University.png'),
        kiit: getAssetUrl('/uploads/logos/KIIT.png'),
        lexicon: getAssetUrl('/uploads/logos/Lexicon Management Institute.png'),
        lpu: getAssetUrl('/uploads/logos/Lovely Professional University.png'),
        nshm: getAssetUrl('/uploads/logos/NSHM Knowledge Campus.jpg'),
        republic: getAssetUrl('/uploads/logos/Republic NewsIndia.png'),
    },
    images: {
        aboutHome: getAssetUrl('/uploads/images/about_home_page.webp'),
        aboutSection1: getAssetUrl('/uploads/images/about_section_image1.webp'),
        aboutSection2: getAssetUrl('/uploads/images/about_section_image2.webp'),
        bannerHome: getAssetUrl('/uploads/images/banner_homepage.png'),
        popular1: getAssetUrl('/uploads/images/most_popular1.png'),
        popular2: getAssetUrl('/uploads/images/most_popular2.png'),
        student: getAssetUrl('/uploads/images/student_image.webp'),
    }
};
