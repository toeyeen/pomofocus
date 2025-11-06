export function extraNumber(value: string): number {
  return value.replace(/\D/g, '') as unknown as number;
}



import type { Octokit } from "@octokit/rest";
import { extraNumber } from "../utils/index.ts";
import AppError from "../errors/appError.ts";

type DaysString = `${number}d`


class GithubService {
  private octokit: Octokit;

  constructor(octokit: Octokit) {
    this.octokit = octokit;
  }


  async getCommit(owner: string, repo: string, ref: string) {
    try {
      const { data: commit } = await this.octokit.rest.repos.getCommit({
        owner,
        repo,
        ref,
      });

      console.log(commit.files);

      return commit;
    } catch (error) {

      console.log(error, 'Error getting commit');
      if (error instanceof AppError) {
        throw new AppError(`Failed to get commit ${ref}: ${error.message}`, 500);
      }
    }
  }




  async getCommits(owner: string, repo: string, since: DaysString = '30d', per_page = 10) {


    const today = new Date();
    const sinceDAte = new Date(new Date().setDate(today.getDate() + extraNumber(since))).toISOString()


    try {
      const { data: commits } = await this.octokit.rest.repos.listCommits({
        owner,
        repo,
        sha,
        since: sinceDAte,
        per_page,
      });

      console.log(commits, 'commits list');
      return commits;
    } catch (error) {
      if (error instanceof AppError) {
        throw new AppError(`Failed to get commits: ${error.message}`, 500);
      }
    }
  }


  async getDetailedCommits(owner: string, repo: string, commitCount = 10) {

    // First get the list of commits
    const basicCommits = await this.getCommits(owner, repo, '30d', commitCount);

    if (!basicCommits) {
      throw new AppError('No commits found', 404);
    }

    // Then get detailed info for each commit
    const detailedCommits = await Promise.all(
      basicCommits.map(async (commit) => {
        const detailedCommit = await this.getCommit(owner, repo, commit.sha);
        return detailedCommit;
      })
    );


    console.log(detailedCommits, 'detailed commit');

    return detailedCommits;



  }

  async getRateLimit() {
    const { data: rateLimit } = await this.octokit.rest.rateLimit.get();

    console.log(rateLimit.resources.core, 'rateLimit');
    return rateLimit.resources.core;
  }

}


export default GithubService;
