const SvgDagpenger = (props: { className: string }) => (
    <svg width="1em" height="1em" viewBox="0 0 109 109" {...props}>
        <defs>
            <circle id="dagpenger_svg__a" cx={54.5} cy={54.5} r={54.5} />
            <path
                d="M38.68.18C44.676 3.128 54 11.116 54 18.523V43H0V18.523C0 11.376 8.531 3.689 14.458.509c-.3.183-.458.294-.458.294C15.021 2.493 17.766 10 26.376 10 34.99 10 39 1.941 39 .366a26.67 26.67 0 0 0-.32-.186z"
                id="dagpenger_svg__c"
            />
            <path
                d="M41.339 23.58c-3.877-4.66-6.59-11.189-6.59-11.189-12.333-3.73-27.776.116-27.878.482C5.47 17.848.293 24 .293 24 .372 11.782 6.851-.024 20.801 0c14.309-.05 20.16 10.768 20.538 23.58z"
                id="dagpenger_svg__e"
            />
            <path
                d="M20.5 19c-4.695 0-8.5-1.567-8.5-3.5s3.805-3.5 8.5-3.5 8.5 1.567 8.5 3.5-3.805 3.5-8.5 3.5m8.43-7.209c-3.58-1.334-5.01-1.765-7.976-1.765s-4.982.018-8.874 2C3.083 16.606 0 .43 0 .43 0 26.22 12.812 33 20.819 33 28.952 33 42 27.079 42 0c0 0-3.848 15.228-13.07 11.791"
                id="dagpenger_svg__g"
            />
        </defs>
        <g fill="none" fillRule="evenodd">
            <mask id="dagpenger_svg__b" fill="#fff">
                <use xlinkHref="#dagpenger_svg__a" />
            </mask>
            <use fill="#FFF" fillRule="nonzero" xlinkHref="#dagpenger_svg__a" />
            <g mask="url(#dagpenger_svg__b)">
                <path
                    d="M42 67.673C43.021 69.306 45.89 98 54.5 98 63.112 98 67 68.772 67 67.251c-13.185-7.553-25 .422-25 .422z"
                    fill="#E7E5E2"
                />
                <g transform="translate(28 67)">
                    <mask id="dagpenger_svg__d" fill="#fff">
                        <use xlinkHref="#dagpenger_svg__c" />
                    </mask>
                    <use fill="#D8A25D" xlinkHref="#dagpenger_svg__c" />
                    <g mask="url(#dagpenger_svg__d)" fill="#6AB889">
                        <path d="M-33 72H93V-28H-33z" />
                    </g>
                </g>
                <path
                    d="M75.215 52.28c-2.498 10.303-10.6 17.852-20.211 17.852-9.611 0-17.714-7.55-20.21-17.855-.244.09-.512.141-.794.141-1.103 0-2-.771-2-1.726v-6.965c0-.955.897-1.727 2-1.727.074 0 .147.003.218.01C35.691 30.128 44.435 21 55.004 21c10.568 0 19.314 9.127 20.787 21.01.068-.007.138-.01.209-.01 1.105 0 2 .772 2 1.727v6.965c0 .955-.895 1.726-2 1.726a2.27 2.27 0 0 1-.785-.138z"
                    fill="#E7E5E2"
                />
                <path
                    d="M48.343 43.19c-1.447.08-1.852-1.45-1.416-2.447.082-.19.56-1.05 1.409-1.05.847 0 1.22.47 1.273.551.623.973.318 2.861-1.266 2.946m15.149 0c1.447.08 1.852-1.45 1.417-2.447-.083-.19-.562-1.05-1.41-1.05-.847 0-1.22.47-1.273.551-.623.973-.317 2.861 1.266 2.946"
                    fill="#635E59"
                />
                <path
                    d="M56.8 45.84c.865-.133 1.708-.1 2.104.385.965 1.186.688 2.555-.937 3.566-.812.506-1.962.713-2.667.4"
                    stroke="#D1BFA3"
                    strokeLinecap="round"
                />
                <path
                    d="M50.114 55.817s.738.851 2.793.835l2.056-.016"
                    stroke="#593A32"
                    strokeWidth={1.013}
                    strokeLinecap="round"
                />
                <g transform="translate(33.977 17)">
                    <mask id="dagpenger_svg__f" fill="#fff">
                        <use xlinkHref="#dagpenger_svg__e" />
                    </mask>
                    <g mask="url(#dagpenger_svg__f)" fill="#3E3832">
                        <path d="M-13.682-29h67v79h-67z" />
                    </g>
                </g>
                <g transform="translate(33.9 41)">
                    <mask id="dagpenger_svg__h" fill="#fff">
                        <use xlinkHref="#dagpenger_svg__g" />
                    </mask>
                    <g mask="url(#dagpenger_svg__h)" fill="#3E3832">
                        <path d="M-13-24h69v79h-69z" />
                    </g>
                </g>
            </g>
        </g>
    </svg>
);

export default SvgDagpenger;
