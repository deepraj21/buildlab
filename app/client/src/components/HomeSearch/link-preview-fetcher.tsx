import { useEffect, useState } from 'react';
import { getLinkPreview } from "link-preview-js";

export function LinkPreviewFetcher({ url }: { url: string }) {
    const [metadata, setMetadata] = useState<{ title: string; description: string; favicon: string } | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const data: { title?: string; description?: string; favicons?: string[] } = await getLinkPreview(url);
                setMetadata({
                    title: data.title || 'No title available',
                    description: data.description || 'No description available',
                    favicon: data.favicons?.[0] || `${new URL(url).origin}/favicon.ico`,
                });
            } catch (error) {
                console.error('Error fetching link preview:', error);
                setMetadata(null);
            }
        }
        fetchData();
    }, [url]);

    if (!metadata) {
        return (
            <div className="max-w-[70%] overflow-x-auto border rounded-lg shadow-sm bg-muted/50"><a href={url} target="_blank" rel="noopener noreferrer p-2" className="text-blue-500 hover:underline text-sm pl-2 w-full truncate">
                {url}
            </a></div>
        )
    }

    return (
        <div className="max-w-[70%] w-full overflow-hidden border rounded-lg shadow-sm bg-muted/50">
            <div className="flex items-center p-2 border-b">
                <div className='flex items-center gap-2'>
                    {metadata.favicon && (
                        <div className="w-4 h-4">
                            <img
                                src={metadata.favicon}
                                alt="Website favicon"
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                    )}
                    <h2 className="text-sm w-[180px] truncate">{metadata.title}</h2>
                </div>
            </div>
            <p className="text-sm text-gray-600 p-2 w-full truncate">{metadata.description}</p>
            <div className="w-full overflow-x-auto border-t shadow-sm ">
                <a href={url} target="_blank" rel="noopener noreferrer p-2" className="text-blue-500 hover:underline text-sm p-2 w-full truncate overflow-x-auto">
                    {url}
                </a>
            </div>
        </div>
    );
}
