# About

This is the source for https://mzw.us, a leightweight gallery of my personal photos - this site is intended to provide a distraction-free viewing experience on both desktop and mobile devices. Photo captions are provided via associated [markdown files](https://www.markdownguide.org/basic-syntax/) (e.g., `sample-photo-preview.jpg` will have its description derived from `sample-photo-preview.md`).

# Getting Started

The contents of this repository can be downloaded/re-hosted on your domain. 

Content can be curated in the `\images` directory, gallery sections are described below:

```
images
  ├─ section 1
  |  ├─ image-1-preview.jpg
  |  ├─ image-1-preview.md
  |  ├─ image-2-preview.jpg
  |  ├─ image-2-preview.md
  |  ├─ hi-res
  |  |  ├─ image-1.jpg
  |  |  ├─ image-2.jpg
  .
  .
  .
```

## Batch Image Resizing

Included in this repository is a `batch-process.sh` shell script - this can quickly resize and create associated caption markdown files for all photos in a given directory and copy them to the directory's parent directory.

For example,

```
images
  ├─ section 1
  |  ├─ hi-res          <- run batch-process.sh here
  |  |  ├─ image-1.jpg
  |  |  ├─ image-2.jpg
```

To generate,

```
images
  ├─ section 1
  |  ├─ image-1-preview.jpg
  |  ├─ image-1-preview.md
  |  ├─ image-2-preview.jpg
  |  ├─ image-2-preview.md
  |  ├─ hi-res
  |  |  ├─ image-1.jpg
  |  |  ├─ image-2.jpg
  .
  .
  .
```

From here, you can edit the generated markdown files for each associated photo.