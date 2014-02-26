#Tech Radar

###Description

The goal of the technology radar is to communicate the things we use at meltmedia and the things we are investigating. The idea is to have a clear way to communicate the tools and techniques we consider core to what we do and are good at. It also gives us a way to share visibility into what newer concepts we are looking at or are trying on projects.

[View more information on Confluence](https://confluence.meltdev.com/display/RDEV/Tech+Radar)

### Requirements

- bower ([http://bower.io/](http://bower.io/))

###Setup

Clone the repo, change your directory, checkout the desired branch, and then run 'grunt prepare' which will install all of the required dependencies.

```
git clone git@github.com:meltmedia/techradar.git
cd techradar
git checkout branch-name
grunt prepare
```

### Build

Run a local copy at [http://localhost:5555](http://localhost:5555)

```
grunt run
```

###Export

Every push to the dev branch, melt-dev-radar, will queue up a totem build. Updating the staging link automatically. The deployment can take ~5-10 minutes. The staging link for this branch is:

- [http://radar-dev.cu.melt.sh/index.html](http://radar-dev.cu.melt.sh/index.html)

### Release

This project uses the [Git Flow](https://confluence.meltdev.com/display/DEV/Git+Flow) process for getting changes into the project.