{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-26.05";
    nixpkgs-unstable.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    nixpkgs,
    flake-utils,
    ...
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = import nixpkgs {inherit system;};
    in {
      devShells.default = pkgs.mkShell {
        nativeBuildInputs = with pkgs; [
          go-task
          markdownlint-cli2
          reveal-md
        ];
        shellHook = ''
          red=$(tput setaf 1 2>/dev/null || true)
          green=$(tput setaf 2 2>/dev/null || true)
          yellow=$(tput setaf 3 2>/dev/null || true)
          bold=$(tput bold 2>/dev/null || true)
          reset=$(tput sgr0 2>/dev/null || true)

          printf "$red$bold┌──────────────────────────────────────────────────────────┐\n"
          printf "│                       AI Workshop                        │\n"
          printf "└──────────────────────────────────────────────────────────┘$reset\n\n"

          printf "$yellow Quick Info $reset\n"
          printf "  $bold start slides:         $reset task slides\n"
          printf "\n"

          unset red green yellow bold reset
        '';
      };
      apps.slides = {
        type = "app";
        program = toString (pkgs.writeShellScript "show-slides" ''
            rootDir="$(git rev-parse --show-toplevel)"
            cd "$rootDir/slides"
          exec ${pkgs.reveal-md}/bin/reveal-md slides.md "$@"
        '');
      };
    });
}
