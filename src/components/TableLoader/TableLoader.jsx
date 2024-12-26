import ContentLoader from 'react-content-loader'

const TableLoader = ({ isSidebarOpen }) => {
    const width = isSidebarOpen ? 1000 : 1300;

    return (
        <ContentLoader
            width={width}
            height={270}
            viewBox={`0 0 ${width} 270`}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"

        >
            <rect x="27" y="10" rx="4" ry="4" width="20" height="20" />
            <rect x="160" y="10" rx="10" ry="10" width="85" height="19" />
            <rect x="320" y="10" rx="10" ry="10" width="320" height="19" />
            <rect x="780" y="10" rx="10" ry="10" width="155" height="19" />
            <rect x="1050" y="10" rx="10" ry="10" width="169" height="19" />

            <rect x="27" y="60" rx="4" ry="4" width="20" height="20" />
            <rect x="160" y="60" rx="10" ry="10" width="85" height="19" />
            <rect x="320" y="60" rx="10" ry="10" width="320" height="19" />
            <rect x="780" y="60" rx="10" ry="10" width="155" height="19" />
            <rect x="1050" y="60" rx="10" ry="10" width="169" height="19" />

            <rect x="27" y="110" rx="4" ry="4" width="20" height="20" />
            <rect x="160" y="110" rx="10" ry="10" width="85" height="19" />
            <rect x="320" y="110" rx="10" ry="10" width="320" height="19" />
            <rect x="780" y="110" rx="10" ry="10" width="155" height="19" />
            <rect x="1050" y="110" rx="10" ry="10" width="169" height="19" />

            <rect x="27" y="170" rx="4" ry="4" width="20" height="20" />
            <rect x="160" y="170" rx="10" ry="10" width="85" height="19" />
            <rect x="320" y="170" rx="10" ry="10" width="320" height="19" />
            <rect x="780" y="170" rx="10" ry="10" width="155" height="19" />
            <rect x="1050" y="170" rx="10" ry="10" width="169" height="19" />

            <rect x="27" y="230" rx="4" ry="4" width="20" height="20" />
            <rect x="160" y="230" rx="10" ry="10" width="85" height="19" />
            <rect x="320" y="230" rx="10" ry="10" width="320" height="19" />
            <rect x="780" y="230" rx="10" ry="10" width="155" height="19" />
            <rect x="1050" y="230" rx="10" ry="10" width="170" height="19" />
        </ContentLoader>
    )
}

export default TableLoader;