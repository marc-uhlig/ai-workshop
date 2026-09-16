{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-26.05";
    nixpkgs-unstable.url = "github:nixos/nixpkgs?ref=nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    nixpkgs,
    nixpkgs-unstable,
    flake-utils,
    ...
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = import nixpkgs {inherit system;};
      unstable = import nixpkgs-unstable {inherit system;};
      playwrightEnv = ''
        export PLAYWRIGHT_BROWSERS_PATH=${unstable.playwright.browsers}
        export PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=true
      '';
      browserVersion = unstable.playwright.version;
    in {
      devShells.default = unstable.mkShell {
        nativeBuildInputs = with pkgs; [
          gnused
          jq
          nodejs_24
          pnpm
          python3
        ];
        shellHook = ''
          ${playwrightEnv}

          red=$(tput setaf 1 2>/dev/null || true)
          green=$(tput setaf 2 2>/dev/null || true)
          yellow=$(tput setaf 3 2>/dev/null || true)
          bold=$(tput bold 2>/dev/null || true)
          reset=$(tput sgr0 2>/dev/null || true)

          printf "$red$bold┌──────────────────────────────────────────────────────────┐\n"
          printf "│                  Kudos Card Generator                    │\n"
          printf "└──────────────────────────────────────────────────────────┘$reset\n\n"

          printf "$yellow Playwright $reset\n"
          printf "  $bold Browsers:             $reset ${browserVersion}\n"
          printf "  $bold App:                  $reset TODO\n"

          unset red green yellow bold reset
        '';
      };
    });
}
