import * as React from 'react';

export default function Home() {
    return (
        <React.Fragment>
            <Landing />
            <main className='home-page'>
                <Overlay />
                <AboutSection />
                <FeaturedProjects />
                <ContactMe />
                <Footer />     
            </main>
        </React.Fragment>
    )
}