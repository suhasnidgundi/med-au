import Link from 'next/link';
import { Home } from 'lucide-react';
import "./BottomNavbar.module.css";
import { HeartHandshake } from 'lucide-react';
import { CircleUserRound } from 'lucide-react';
import { Hospital } from 'lucide-react';
import { BookText } from 'lucide-react';


export default function BottomNavbar() {
    return (

        <nav className="bottom-navbar fixed-bottom my-8" style={{ marginBottom: "2vh" }}>
            <hr />
            <div className="d-flex justify-content-around align-items-center">
                <Link href="/dashboard/" className="nav-item">
                    <Home size={30} />
                </Link>
                <Link href="/dashboard/reports" className="nav-item">
                    <BookText size={30} />

                </Link>
                <Link href="/dashboard/consultation" className="nav-item main-button">
                    <HeartHandshake size={60} />

                </Link>
                <Link href="/dashboard/nearByHospitals" className="nav-item">
                    <Hospital size={30} />  

                </Link>
                <Link href="/dashboard/profile" className="nav-item">
                    <CircleUserRound size={30} />
                </Link>
            </div>
        </nav>

    );
}