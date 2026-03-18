import { useEffect, useMemo, useRef } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';

interface Props {
  departureLat: number;
  departureLng: number;
  arrivalLat: number;
  arrivalLng: number;
  departureLabel: string;
  arrivalLabel: string;
  progress: number; // 0 ~ 100
}

// 두 지점 사이를 progress 비율로 보간 (구면 선형 보간)
function interpolatePosition(
  lat1: number, lng1: number,
  lat2: number, lng2: number,
  t: number,
): { lat: number; lng: number } {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const toDeg = (r: number) => (r * 180) / Math.PI;

  const φ1 = toRad(lat1), λ1 = toRad(lng1);
  const φ2 = toRad(lat2), λ2 = toRad(lng2);

  const Δφ = φ2 - φ1;
  const Δλ = λ2 - λ1;
  const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  const d = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  if (d === 0) return { lat: lat1, lng: lng1 };

  const A = Math.sin((1 - t) * d) / Math.sin(d);
  const B = Math.sin(t * d) / Math.sin(d);
  const x = A * Math.cos(φ1) * Math.cos(λ1) + B * Math.cos(φ2) * Math.cos(λ2);
  const y = A * Math.cos(φ1) * Math.sin(λ1) + B * Math.cos(φ2) * Math.sin(λ2);
  const z = A * Math.sin(φ1) + B * Math.sin(φ2);

  return {
    lat: toDeg(Math.atan2(z, Math.sqrt(x ** 2 + y ** 2))),
    lng: toDeg(Math.atan2(y, x)),
  };
}

export default function FlightMap({
  departureLat, departureLng,
  arrivalLat, arrivalLng,
  departureLabel, arrivalLabel,
  progress,
}: Props) {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);

  const arcs = useMemo(() => [{
    startLat: departureLat,
    startLng: departureLng,
    endLat: arrivalLat,
    endLng: arrivalLng,
    color: ['rgba(255,255,255,0.6)', 'rgba(255,255,255,0.1)'],
  }], [departureLat, departureLng, arrivalLat, arrivalLng]);

  const planePos = useMemo(
    () => interpolatePosition(departureLat, departureLng, arrivalLat, arrivalLng, progress / 100),
    [departureLat, departureLng, arrivalLat, arrivalLng, progress],
  );

  const points = useMemo(() => [
    { lat: departureLat, lng: departureLng, label: departureLabel, color: '#60a5fa', size: 0.5 },
    { lat: arrivalLat,   lng: arrivalLng,   label: arrivalLabel,   color: '#34d399', size: 0.5 },
    { lat: planePos.lat, lng: planePos.lng,  label: '✈',            color: '#ffffff', size: 0.8 },
  ], [departureLat, departureLng, arrivalLat, arrivalLng, departureLabel, arrivalLabel, planePos]);

  // 초기 카메라 — 두 공항 중간 지점으로 이동
  useEffect(() => {
    if (!globeRef.current) return;
    const midLat = (departureLat + arrivalLat) / 2;
    const midLng = (departureLng + arrivalLng) / 2;
    globeRef.current.pointOfView({ lat: midLat, lng: midLng, altitude: 2.5 }, 1000);
  }, [departureLat, departureLng, arrivalLat, arrivalLng]);

  return (
    <Globe
      ref={globeRef}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      backgroundColor="rgba(0,0,0,0)"
      atmosphereColor="#1e3a5f"
      atmosphereAltitude={0.15}
      arcsData={arcs}
      arcColor="color"
      arcDashLength={0.4}
      arcDashGap={0.2}
      arcDashAnimateTime={2000}
      arcStroke={0.5}
      pointsData={points}
      pointLat="lat"
      pointLng="lng"
      pointColor="color"
      pointRadius="size"
      pointLabel="label"
      pointAltitude={0.01}
      width={600}
      height={600}
    />
  );
}
