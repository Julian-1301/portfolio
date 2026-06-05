// Automatically load images from a folder
export async function loadProjectImages(projectName) {
    // Use eager: true to get actual URLs immediately
    const imageModules = import.meta.glob('/public/images/projects/*/*.{jpg,jpeg,png,webp,gif}', { eager: true })

    const basePath = `/images/projects/${projectName}/`
    const images = []

    // Find all images in the project folder
    Object.keys(imageModules).forEach(path => {
        if (path.includes(`/images/projects/${projectName}/`)) {
            const filename = path.split('/').pop()
            // Get the actual URL from the imported module
            const imageUrl = imageModules[path].default || imageModules[path]

            images.push({
                filename,
                path: imageUrl,
                isMain: filename.toLowerCase().includes('main') ||
                    filename.toLowerCase().includes('cover') ||
                    filename.toLowerCase().includes('thumbnail')
            })
        }
    })

    // If no images found with eager, try fallback with direct paths
    if (images.length === 0) {
        // Fallback: construct paths directly (for development)
        const fallbackExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif']
        for (const ext of fallbackExtensions) {
            const testPath = `${basePath}main.${ext}`
            // We'll just assume the path might exist
            images.push({
                filename: `main.${ext}`,
                path: testPath,
                isMain: true
            })
            break // Just add one fallback
        }
    }

    // Sort alphabetically
    images.sort((a, b) => a.filename.localeCompare(b.filename))

    // Set the first one as main if no 'main' or 'cover' found
    const mainImage = images.find(img => img.isMain) || images[0]
    const screenshots = images.filter(img => img !== mainImage)

    return {
        main: mainImage?.path || null,
        screenshots: screenshots.map(img => img.path),
        all: images.map(img => img.path)
    }
}