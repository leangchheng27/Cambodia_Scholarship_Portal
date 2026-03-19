export const parseDetails = (details) => {
    if (!details) return {};
    if (typeof details === 'string') {
        try {
            return JSON.parse(details);
        } catch {
            return {};
        }
    }
    return typeof details === 'object' ? details : {};
};

export const toMultilineText = (value) => {
    if (!value) return '';
    if (Array.isArray(value)) return value.filter(Boolean).join('\n');
    return String(value);
};

export const getInitialFormState = (tab, item = null) => {
    if (tab === 'users') {
        return {
            name: item?.name || '',
            email: item?.email || '',
            password: '',
            role: item?.role || 'user',
            isVerified: item?.isVerified ?? true,
        };
    }

    if (tab === 'universities') {
        return {
            name: item?.name || '',
            description: item?.description || '',
            location: item?.location || '',
            original_link: item?.original_link || item?.website || '',
            poster_image_url: item?.poster_image_url || item?.image_url || '',
            slider_image_url: item?.slider_image_url || '',
        };
    }

    if (tab === 'scholarships') {
        const details = parseDetails(item?.details);

        return {
            name: item?.name || '',
            type: item?.type || 'cambodia',
            description: item?.description || '',
            funded_by: item?.funded_by || '',
            course_duration: item?.course_duration || '',
            original_link: item?.original_link || item?.registration_link || '',
            poster_image_url: item?.poster_image_url || item?.image_url || '',
            slider_image_url: item?.slider_image_url || '',
            eligibility: toMultilineText(details.eligibility || details.eligibilities),
            applicable_programs: toMultilineText(details.programs || details.fieldsOfStudy),
            benefits: toMultilineText(details.benefits),
        };
    }

    if (tab === 'internships') {
        const details = parseDetails(item?.details);

        return {
            name: item?.name || '',
            description: item?.description || '',
            company: item?.company || item?.funded_by || '',
            duration: item?.duration || item?.course_duration || '',
            original_link: item?.original_link || item?.registration_link || '',
            poster_image_url: item?.poster_image_url || item?.image_url || '',
            slider_image_url: item?.slider_image_url || '',
            eligibility: toMultilineText(details.eligibility || details.eligibilities),
            applicable_programs: toMultilineText(details.programs || details.fieldsOfStudy),
            benefits: toMultilineText(details.benefits),
        };
    }

    return {};
};
