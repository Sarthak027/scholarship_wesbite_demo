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
        economicTimes: getAssetUrl('/uploads/logos/Economic_times.png'),
        forbes: getAssetUrl('/uploads/logos/Forbes India.png'),
        gibs: getAssetUrl('/uploads/logos/GIBS Business School.png'),
        hindustan: getAssetUrl('/uploads/logos/Hindustan_times.png'),
        iilm: getAssetUrl('/uploads/logos/IILM University.png'),
        kiit: getAssetUrl('/uploads/logos/KIIT.png'),
        lexicon: getAssetUrl('/uploads/logos/Lexicon Management Institute.png'),
        lpu: getAssetUrl('/uploads/logos/Lovely Professional University.png'),
        nshm: getAssetUrl('/uploads/logos/NSHM Knowledge Campus.jpg'),
        republic: getAssetUrl('/uploads/logos/Republic_news.png'),
    },
    collegeCarousel: {
        college1: getAssetUrl('/uploads/logos/colleges_carasoul_images/1.png'),
        college2: getAssetUrl('/uploads/logos/colleges_carasoul_images/2.png'),
        college3: getAssetUrl('/uploads/logos/colleges_carasoul_images/3.png'),
        college4: getAssetUrl('/uploads/logos/colleges_carasoul_images/4.png'),
        college5: getAssetUrl('/uploads/logos/colleges_carasoul_images/5.png'),
        college6: getAssetUrl('/uploads/logos/colleges_carasoul_images/6.png'),
        jagiJain: getAssetUrl('/uploads/logos/colleges_carasoul_images/jagi-jain.png'),
        logo: getAssetUrl('/uploads/logos/colleges_carasoul_images/logo.png'),
        logo1: getAssetUrl('/uploads/logos/colleges_carasoul_images/logo-1.png'),
        logo2: getAssetUrl('/uploads/logos/colleges_carasoul_images/logo2.png'),
        logo3: getAssetUrl('/uploads/logos/colleges_carasoul_images/logo-3.png'),
        logo4: getAssetUrl('/uploads/logos/colleges_carasoul_images/logo-4.png'),
        sharda: getAssetUrl('/uploads/logos/colleges_carasoul_images/sharda.png'),
        vigna: getAssetUrl('/uploads/logos/colleges_carasoul_images/vigna.png'),
    },
    images: {
        aboutHome: getAssetUrl('/uploads/images/about_home_page.webp'),
        aboutSection1: getAssetUrl('/uploads/images/about_section_image1.webp'),
        aboutSection2: getAssetUrl('/uploads/images/about_section_image2.webp'),
        bannerHome: getAssetUrl('/uploads/images/banner_homepage.png'),
        popular1: getAssetUrl('/uploads/images/most_popular1.png'),
        popular2: getAssetUrl('/uploads/images/most_popular2.png'),
        student: getAssetUrl('/uploads/images/student_image.webp'),
    },
    govtScholarships: {
        govt: getAssetUrl('/uploads/images/govt_scholarships/GOVT. SCHOLARSHIP.png'),
        jnTata: getAssetUrl('/uploads/images/govt_scholarships/J.N. TATA SCHOLARSHIP.png'),
        tataPankh: getAssetUrl('/uploads/images/govt_scholarships/TATA PAKH SCHOLARSHIP.png'),
    }
};
