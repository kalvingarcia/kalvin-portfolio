import * as React from 'react';

export const metadata = {
    title: "Kalvin's Porfolio",
    description: "Here you'll find all of Kalvin Garcia's work and projects. You can also find Kalvin's resume and contact information!",
};

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