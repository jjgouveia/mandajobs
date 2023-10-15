/* eslint-disable no-tabs */
/* eslint-disable react/no-unknown-property */

export default function Hero() {
  return (
    <div className="pb-28 sm:-mt-8 mt-5">
      <div className="container mx-auto overflow-y-hidden overflow-x-hidden">
        <div className="flex justify-around flex-wrap items-center min-h-screen">
          <div className="w-full pl-5 sm:pt-5 pt-0 pr-5 sm:pb-5 pb-0 lg:w-1/2 lg:pr-0">
            <h1 className="title sm:text-left text-center lg:text-[5rem] max-xs:text-5xl mb-6 text-[3.5rem] font-bold leading-none sm:tracking-tight tracking-wide md:text-8xl text-gray-100">
              Seu filtro inteligente <br /> de vagas para o{" "}
              <span className="mix-blend-plus-lighter text-blue-500">
                LinkedIn
              </span>
              <div className="aurora">
                <div className="aurora__item" />
                <div className="aurora__item" />
                <div className="aurora__item" />
                <div className="aurora__item" />
              </div>
            </h1>
            <p className="mt-7 hidden sm:block sm:mb-9 mb-0 text-xl font-medium text-gray-100 max-xl:max-w-sm sn:text-center text-justify">
              Alimentado por Inteligência Artificial, o Manda Jobs é um filtro
              inteligente de vagas que conecta você com as melhores
              oportunidades de acordo com o seu perfil.
            </p>
            {/* <SubscriberForm />
            <PartnerCompanies /> */}
          </div>
          <div className="p-0">
            <div id="teste" className="sm:mt-0 -mt-28 flex justify-center">
              <svg
                className="sn:w-full w-4/5 -mt-12"
                height="512"
                viewBox="0 0 512 512"
                fill="none"
                overflow="hidden"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href="#cube" x="128" y="320" strokeWidth="2" opacity="0.3">
                  <animate
                    attributeName="stroke"
                    dur="6s"
                    repeatCount="indefinite"
                    values="#FF9AA2;#FFB7B2;#FFDAC1;#E2F0CB;#B5EAD7;#C7CEEA;#FF9AA2"
                  />
                </use>

                <rect width="512" height="512" y="384" fill="url(#fade)" />
                <use href="#cube" x="128" y="128" strokeWidth="2">
                  <animate
                    attributeName="stroke"
                    dur="6s"
                    repeatCount="indefinite"
                    values="#FF9AA2;#FFB7B2;#FFDAC1;#E2F0CB;#B5EAD7;#C7CEEA;#FF9AA2"
                  />
                </use>

                <defs>
                  <g id="cube">
                    <use
                      href="#cube_outline"
                      strokeLinejoin="round"
                      strokeWidth="16"
                      fill="url(#stars)"
                    />
                    <use href="#cube_base" strokeWidth=".5" />
                    <use
                      href="#cube_outline"
                      strokeLinejoin="round"
                      strokeWidth="6"
                      stroke="#141417"
                    />
                  </g>

                  <g id="cube_outline">
                    <path>
                      <animate
                        attributeName="d"
                        dur="1.5s"
                        repeatCount="indefinite"
                        calcMode="spline"
                        keyTimes="0;0.5;0.5;1"
                        keySplines="0.8 0.2 0.6 0.9;
                      0.8 0.2 0.6 0.9;
                      0.8 0.2 0.6 0.9"
                        values="M10 64 L128 0 L246 64 L246 192 L128 256 L10 192Z;
                      M40 20 L216 20 L216 108 L216 236 L40 236 L40 172Z;
                      M216 20 L40 20 L40 108 L40 236 L216 236 L216 172Z;
                      M246 64 L128 0 L10 64 L10 192 L128 256 L246 192Z"
                      />
                    </path>
                  </g>

                  <g id="cube_base">
                    <path fill="#fff1">
                      <animate
                        attributeName="d"
                        dur="1.5s"
                        repeatCount="indefinite"
                        calcMode="spline"
                        keyTimes="0;0.5;1"
                        keySplines="0.8 0.2 0.6 0.9;
						              0.8 0.2 0.6 0.9"
                        values="M10 64 L128 0 L246 64 L128 128Z;
                      M40 20 L216 20 L216 108 L40 108Z;
                      M128 0 L246 64 L128 128 L10 64Z"
                      />
                    </path>
                    <path>
                      <animate
                        attributeName="d"
                        dur="1.5s"
                        repeatCount="indefinite"
                        calcMode="spline"
                        keyTimes="0;0.5;0.5;1"
                        keySplines="0.8 0.2 0.6 0.9;
                        0.8 0.2 0.6 0.9;
                        0.8 0.2 0.6 0.9"
                        values="M10 64 L128 128 L128 256 L10 192Z;
                      M40 20 L40 108 L40 236 L40 172Z;
                      M216 20 L216 108 L216 236 L216 172Z;
                      M246 64 L128 128 L128 256 L246 192Z"
                      />
                      <animate
                        attributeName="fill"
                        dur="1.5s"
                        repeatCount="indefinite"
                        keyTimes="0;0.5;0.5;1"
                        values="#fff0;#fff0;#fff2;#fff2"
                      />
                    </path>
                    <path fill="#407080">
                      <animate
                        attributeName="d"
                        dur="1.5s"
                        repeatCount="indefinite"
                        calcMode="spline"
                        keyTimes="0;0.5;1"
                        keySplines="0.8 0.2 0.6 0.9;
                        0.8 0.2 0.6 0.9"
                        values="M246 64 L128 128 L128 256 L246 192Z;
                      M216 108 L40 108 L40 236 L216 236Z;
                      M128 128 L10 64 L10 192 L128 256Z"
                      />
                      <animate
                        attributeName="fill"
                        dur="1.5s"
                        repeatCount="indefinite"
                        keyTimes="0;0.5;1"
                        values="#fff2;#fff1;#fff0"
                      />
                    </path>
                  </g>
                  <linearGradient id="fade" gradientTransform="rotate(90)">
                    <stop offset="0" stopColor="#14141700" />
                    <stop offset="0.25" stopColor="#141417ff" />
                  </linearGradient>
                  <linearGradient id="sky" gradientTransform="rotate(90)">
                    <stop offset="0.5" stopColor="#141417" />
                    <stop offset="1" stopColor="#40354a" />
                  </linearGradient>

                  <pattern
                    id="stars"
                    x="0"
                    y="0"
                    width="50%"
                    height="50%"
                    patternUnits="userSpaceOnUse"
                    patternContentUnits="userSpaceOnUse"
                  >
                    <rect width="256" height="256" fill="url(#sky)" />
                    <use href="#star01" x="24" y="32" fill="white" />
                    <use
                      href="#star01"
                      x="64"
                      y="96"
                      fill="#ad9dcb"
                      transform="rotate(90 80 112)"
                    />
                    <use href="#star01" x="224" y="102" fill="#ad9dcb" />
                    <use
                      href="#star01"
                      x="192"
                      y="112"
                      fill="#E0E8EA"
                      transform="rotate(90 80 112)"
                    />
                    <use href="#star02" x="16" y="64" fill="#ad9dcb" />
                    <use href="#star03" x="96" y="16" fill="#E0E8EA" />
                    <use href="#star04" x="64" y="64" fill="white" />
                    <use href="#star04" x="8" y="16" fill="#ad9dcb" />
                    <use href="#star04" x="110" y="96" fill="#E0E8EA" />
                    <use href="#star02" x="160" y="24" fill="#ad9dcb" />
                    <use href="#star03" x="196" y="60" fill="#E0E8EA" />
                    <use href="#star04" x="64" y="212" fill="white" />
                    <use href="#star04" x="218" y="216" fill="#ad9dcb" />
                    <use href="#star03" x="228" y="220" fill="#E0E8EA" />
                    <use href="#star02" x="140" y="128" fill="#ad9dcb" />
                    <use href="#star03" x="24" y="140" fill="#E0E8EA" />
                    <use href="#star04" x="95" y="160" fill="white" />
                    <use href="#star04" x="180" y="128" fill="#ad9dcb" />
                    <use href="#star03" x="200" y="136" fill="#E0E8EA" />
                    <use href="#star10" x="120" y="120" stroke="#E0E8EA" />
                    <use href="#star11" x="48" y="64" stroke="#ad9dcb" />
                  </pattern>
                  <path id="star01" transform="scale(0.5)">
                    <animate
                      attributeName="d"
                      dur="3s"
                      repeatCount="indefinite"
                      calcMode="spline"
                      keyTimes="0;0.5;1"
                      keySplines="0.8 0.2 0.6 0.9; 0.8 0.2 0.6 0.9"
                      values="M16 0 Q16 16 24 16 Q16 16 16 32 Q16 16 8 16 Q16 16 16 0Z;
                    M16 8 Q16 16 32 16 Q16 16 16 24 Q16 16 0 16 Q16 16 16 8Z;
                    M16 0 Q16 16 24 16 Q16 16 16 32 Q16 16 8 16 Q16 16 16 0Z"
                    />
                  </path>
                  <circle id="star02">
                    <animate
                      attributeName="r"
                      dur="3s"
                      repeatCount="indefinite"
                      calcMode="spline"
                      keyTimes="0;0.5;1"
                      keySplines="0.8 0.2 0.6 0.9; 0.8 0.2 0.6 0.9"
                      values="0;2;0"
                    />
                  </circle>
                  <circle id="star03">
                    <animate
                      attributeName="r"
                      dur="6s"
                      repeatCount="indefinite"
                      calcMode="spline"
                      keyTimes="0;0.5;1"
                      keySplines="0.8 0.2 0.6 0.9; 0.8 0.2 0.6 0.9"
                      values="3;1;3"
                    />
                  </circle>
                  <circle id="star04" r="1" />

                  <path id="star10" strokeWidth="2">
                    <animate
                      attributeName="d"
                      dur="5s"
                      repeatCount="indefinite"
                      keyTimes="0;0.90;0.97;1"
                      keySplines="0 0.4 1 0.2; 0 0.4 1 0.2; 0 0.4 1 0.2"
                      values="M64 0 L64 0Z; M64 0 L64 0Z; M48 12 L0 48Z; M0 48 L0 48Z"
                    />
                    <animate
                      attributeName="opacity"
                      dur="5s"
                      repeatCount="indefinite"
                      keyTimes="0;0.90;0.97;1"
                      values="1; 1; 0.6; 0"
                    />
                  </path>
                  <path id="star11" strokeWidth="3">
                    <animate
                      attributeName="d"
                      dur="6s"
                      repeatCount="indefinite"
                      delay="3s"
                      keyTimes="0;0.90;0.95;1"
                      keySplines="0 0.4 1 0.2; 0 0.4 1 0.2; 0 0.4 1 0.2"
                      values="M64 0 L64 0Z; M64 0 L64 0Z; M48 12 L0 48Z; M0 48 L0 48Z"
                    />
                    <animate
                      attributeName="opacity"
                      dur="6s"
                      repeatCount="indefinite"
                      delay="3s"
                      keyTimes="0;0.90;0.95;1"
                      values="1; 1; 0.6; 0"
                    />
                  </path>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
